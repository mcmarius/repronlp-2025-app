'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

interface DeleteUserProps {
  baseURL: string;
  csrf: string;
  token: string;
  uid: string;
}

export default function AdminDeleteUser(props: DeleteUserProps) {
    const router = useRouter()
    const baseURL = props.baseURL
    const csrf = props.csrf
    const token = props.token
    const uid = props.uid
    const baseURLencoded = encodeURIComponent(baseURL)

    const deleteUser = async ( e: MouseEvent) => {
      // e.preventDefault();
      const deleteUserParams = new URLSearchParams({command: "delete_user", uid: uid}).toString()
      await fetch(`${baseURL}/api/admin?${deleteUserParams}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Cookie': `authjs.csrf-token=${csrf}; authjs.callback-url=${baseURLencoded}; authjs.session-token=${token}` },
      })
      router.refresh()
    }
    return (
      <button onClick={deleteUser} className="btn position-absolute end-0 btn btn-sm btn-danger">Delete</button>
    )
}
