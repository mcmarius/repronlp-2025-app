import { MouseEvent, use } from 'react'

import { API } from '@/auth'
import AdminDeleteUser from '@/components/admin-delete-user'

interface ListUserProps {
  user: string;
}

export default async function AdminUserList(props: ListUserProps) {
    const thisUser = props.user
    const getUsersParams = {command: "get_users"}
    const users = await API('/api/admin', 'GET', getUsersParams)
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
               <AdminDeleteUser disabled={thisUser == user[0]} uid={user[0]}/>
            </li>
            </span>
          ))}
        </ul>
      </div>
    )
}
