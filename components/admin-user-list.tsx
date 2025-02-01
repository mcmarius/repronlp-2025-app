//'use client'

import { MouseEvent, use } from 'react'
import AdminDeleteUser from '@/components/admin-delete-user'

interface ListUserProps {
  user: string;
  baseURL: string;
  cookie: string;
}

export default async function AdminUserList(props: ListUserProps) {
    const thisUser = props.user
    const baseURL = props.baseURL
    const cookie = props.cookie
    //const users = use(props.users)
    // console.log(`cookie: ${cookie}`)
    const getUsersParams = new URLSearchParams({command: "get_users"}).toString()
    const usersData = await fetch(`${baseURL}/api/admin?${getUsersParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
    })
    let users
    if(!usersData.ok) {
        console.log(`........................`)
        users = {data: {}}
    }
    else {
        users = await usersData.json()
    }
    // console.log(`user data ${JSON.stringify(usersData)}`)
    // console.log(`user list ${JSON.stringify(users.data)}`)
    //Object.entries(users.data).map((user) => (
    //    console.log(`-> ${user[0]} with ${user[1].displayName}`)
    //))
    return (
      <div>
      <ul id="user-list" className="list-group col-4">
        {Object.entries(users.data).map((user: any[]) => (
          <span key={`ul-span-${user[0]}`} id={`user-list-${user[0]}`}>
          <li className="list-group-item" key={user[0]}>{user[1].displayName}, role: {user[1].role || 'user'}
             <AdminDeleteUser disabled={thisUser == user[0]} baseURL={baseURL} cookie={cookie} uid={user[0]}/>
          </li>
          </span>
        ))}
      </ul>
      </div>
    )
}
