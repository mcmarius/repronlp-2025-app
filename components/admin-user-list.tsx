'use client'

import { MouseEvent, useState } from 'react'

import { AdminAPI } from '@/components/admin-api'
import AdminDeleteUser from '@/components/admin-delete-user'

interface ListUserProps {
  user: string;
}

interface UserListFormParams {
  users: object,
  thisUser: string
}

function Users(params: UserListFormParams) {
  const users = params.users
  const thisUser = params.thisUser
  return (
    <ul id="user-list" className="list-group col-4">
      {Object.entries(users).map((user: any[]) => (
        <span key={`ul-span-${user[0]}`} id={`user-list-${user[0]}`}>
        <li className="list-group-item" key={user[0]}>{user[1].displayName}, role: {user[1].role || 'user'}
           <AdminDeleteUser disabled={thisUser == user[0]} uid={user[0]}/>
        </li>
        </span>
      ))}
    </ul>
  )
}

export default function AdminUserList(props: ListUserProps) {
    const thisUser = props.user
    const getUsersParams = {command: "get_users"}
    const [users, setUsers] = useState({})

    const onFetchClick = () => {
      if (Object.entries(users).length == 0) {
        AdminAPI(setUsers, getUsersParams, 'GET')
      }
    }
    return (
      <div>
        <h4 className="ml-4">User list</h4>
        <button className="btn btn-outline-primary" onClick={onFetchClick}>Fetch users
        </button>
        {Object.entries(users).length > 0 && <Users users={users} thisUser={thisUser} />}
      </div>
    )
}
