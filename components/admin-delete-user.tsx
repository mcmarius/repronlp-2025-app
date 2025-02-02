'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

interface DeleteUserProps {
  uid: string;
  disabled: boolean;
}

export default function AdminDeleteUser(props: DeleteUserProps) {
    const router = useRouter()
    const uid = props.uid
    const disabled = props.disabled

    const deleteUser = async ( e: MouseEvent) => {
      // e.preventDefault();
      const deleteUserParams = new URLSearchParams({command: "delete_user", uid: uid}).toString()
      await fetch(`/api/admin?${deleteUserParams}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      let parent = document.getElementById('user-list');
      if (parent) {
        let toDelete = Array.from(parent.children).find((e) => e.id == `user-list-${uid}`)
        if(toDelete && toDelete.firstChild) {
          toDelete.removeChild(toDelete.firstChild);
        }
      }
    }
    return (
      <button disabled={disabled} onClick={deleteUser} className="btn position-absolute end-0 btn btn-sm btn-danger">Delete</button>
    )
}
