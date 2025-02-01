import { cookies } from 'next/headers'

import { FormEvent, Suspense } from 'react'
import { useState, useEffect } from 'react'

import { auth } from "@/auth"
import AdminCreateUser from '@/components/admin-create-user'
import AdminUserList from '@/components/admin-user-list'
import AdminUserResponses from '@/components/admin-user-responses'

export default async function AdminData() {
    const cookieStore = await cookies()
    const session = await auth()
    // console.log(`admin data auth ${JSON.stringify(session)}`)
    const user = session?.user.name || 'unknown_user'
    const csrfPrefix = process.env.VERCEL ? '__Host-' : ''
    const cookiePrefix = process.env.VERCEL ? '__Secure-' : ''
    const csrf0 = cookieStore.get(`${csrfPrefix}authjs.csrf-token`) || {value: ''}
    const token = cookieStore.get(`${cookiePrefix}authjs.session-token`)
    const baseURL = process.env.VERCEL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'
    const baseURLencoded = encodeURIComponent(baseURL)
    const csrf = encodeURIComponent(csrf0?.value)
    const newCookie = `${csrfPrefix}authjs.csrf-token=${csrf}; ${cookiePrefix}authjs.callback-url=${baseURLencoded}; ${cookiePrefix}authjs.session-token=${token?.value}`
    // console.log(`new cookie: ${newCookie}`)
    // console.log(`new csrf: ${JSON.stringify(csrf)}`)
    // console.log(`new tok: ${token?.value}`)

  return (
    <div>
      <h4 className="ml-4">User list</h4>
        <Suspense>
        <AdminUserList user={user} baseURL={baseURL} cookie={newCookie}/>
        </Suspense>
      <div>
        <h5>Create/update user</h5>
        <AdminCreateUser baseURL={baseURL} cookie={newCookie}/>
      </div>

      {/*credits to https://github.com/dhiazfathra/nextjs-binary-file-download/blob/master/app/page.tsx */}

      <AdminUserResponses baseURL={baseURL} cookie={newCookie}/>
    </div>
  )
}
