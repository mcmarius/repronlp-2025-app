//'use client'

import { MouseEvent, use } from 'react'
import AdminDeleteUser from '@/components/admin-delete-user'

interface ListUserProps {
  baseURL: string;
  cookie: string;
}

export default async function AdminUserList(props: ListUserProps) {
    const baseURL = props.baseURL
    const cookie = props.cookie
    //const users = use(props.users)
    console.log(`cookie: ${cookie}`)
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
        console.log(`user data ${JSON.stringify(usersData)}`)
        console.log(`user list ${JSON.stringify(users.data)}`)
    return (
      <div>
      <ul id="user-list" className="list-group col-4">
        {Object.entries(users.data).map((user: any[]) => (
          <li className="list-group-item" key={user[0]}>{user[1].displayName}, role: {user[1].role || 'user'}
             <AdminDeleteUser baseURL={baseURL} cookie={cookie} uid={user[0]}/>
          </li>
        ))}
      </ul>
      </div>
    )
}
