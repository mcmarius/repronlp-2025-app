//'use client'

import Link from 'next/link'
import Form from 'next/form'
//import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import AdminCreateUser from '@/components/admin-create-user'
import AdminDeleteUser from '@/components/admin-delete-user'
import AdminExportResponses from '@/components/admin-export-responses'
import { auth } from "@/auth"
import { cookies } from 'next/headers'
import Request from 'next'
interface CsrfType extends Request {
    csrfToken: string
}

export default async function AdminData() {
//    const router = useRouter()
    const cookieStore = await cookies()
    const token = cookieStore.get('authjs.session-token')
    const aa = await auth()
    //console.log(`admin data tok ${token.value}: ${JSON.stringify(aa)}`)
    const baseURL = process.env.VERCEL ? `httpsL//${process.env.VERCEL_URL}` : 'http://localhost:3000'
    const baseURLencoded = encodeURIComponent(baseURL)
    const getUsersParams = new URLSearchParams({command: "get_users"}).toString()
    const csrf: CsrfType = await fetch(`${baseURL}/api/auth/csrf`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': `authjs.session-token=${token?.value}` },
    }) as unknown as CsrfType
    
    const usersData = await fetch(`${baseURL}/api/admin?${getUsersParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': `authjs.csrf-token=${csrf.csrfToken}; authjs.callback-url=${baseURLencoded}; authjs.session-token=${token?.value}` },
    })
    let users
    if(!usersData.ok) {
        users = {data: {}}
    }
    else {
        users = await usersData.json()
    }
    //console.log(`admin data: ${Object.entries(users.data)}`)
    //Object.entries(users.data).map((user) => (
    //    console.log(`-> ${user[0]} with ${user[1].displayName}`)
    //))
    const getResponsesParams = new URLSearchParams({command: "get_responses"}).toString()
    const responsesData = await fetch(`${baseURL}/api/admin?${getResponsesParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': `authjs.csrf-token=${csrf.csrfToken}; authjs.callback-url=${baseURLencoded}; authjs.session-token=${token?.value}` },
    })
    let responses
    if(!responsesData.ok) {
        responses = {data: {}}
    }
    else {
        responses = await responsesData.json()
    }
    //console.log(`admin data: ${Object.entries(responses.data)}`)
    //Object.entries(responses.data).map((response) => (
    //    console.log(`-> ${response[0]} with ${response[1].q1}`)
    //))
    // credits to https://github.com/colin-stubbs/js-download-json-from-browser/blob/master/example.html


  return (
    <div>
      <h4 className="ml-4">User list</h4>
      <ul id="user-list" className="list-group col-4">
        {Object.entries(users.data).map((user: any[]) => (
          <li className="list-group-item" key={user[0]}>{user[1].displayName}, role: {user[1].role || 'user'}
             <AdminDeleteUser baseURL={baseURL} csrf={csrf.csrfToken} token={token?.value || ''} uid={user[0]}/>
          </li>
        ))}
      </ul>
      <div>
        <h5>Create/update user</h5>
        <AdminCreateUser baseURL={baseURL} csrf={csrf.csrfToken} token={token?.value || ''}/>
      </div>

      <AdminExportResponses responses={JSON.stringify(responses.data)}/>
      <h4 className="ml-4">Responses</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User#question</th>
            <th scope="col">Factually inacurrate?</th>
            <th scope="col">How inacurrate?</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(responses.data).map((response: any[], i) => (
            <tr id={`response-${i}`} key={i} className="col-2">
              <th scope="row">{i + 1}</th>
              <td>{response[0]}</td>
                <td>{response[1].q1}</td>
                <td>{response[1].q2}</td>
                <td>{response[1].ts}</td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  )
}
