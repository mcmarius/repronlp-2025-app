'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function AdminCreateUser() {
    const router = useRouter()

    const onSubmitCreateUser = async ( event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const uid = form.querySelector('input[name="uid"]') as HTMLInputElement;
      const pw = form.querySelector('input[name="pw"]') as HTMLInputElement;
      const role = form.querySelector('input[name="role"]') as HTMLInputElement;
      const createUserParams = {uid: uid.value, pw: pw.value, role: role.value}
      const commandParams = new URLSearchParams({command: "create_user"}).toString()
      await fetch(`/api/admin?${commandParams}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createUserParams)
      })
      router.refresh()
    }
    return (
      <form id="add-user" className="p-6" onSubmit={onSubmitCreateUser}>
          <div className="row">
            <div className="col-1">
            <label className="form-label" htmlFor="add-user-user">User</label>
            </div>
            <div className="col-2">
            <input required id="add-user-user" className="form-control" name="uid" defaultValue="testuser" type="text"/>
            </div>
          </div>
          <div className="row">
            <div className="col-1 form-label">
            <label htmlFor="add-user-pw">Password</label>
            </div>
            <div className="col-2">
              <input required id="add-user-pw" className="form-control" name="pw" type="password"/>
            </div>
          </div>
          <div className="row">
            <div className="col-1 form-label">
            <label htmlFor="add-user-role">Role</label>
            </div>
            <div className="col-2">
          <input id="add-user-role" className="form-control" name="role" defaultValue="user" type="text"/>
            </div>
          </div>
          <button type="submit" id="add-user-button" className="btn btn-outline-primary btn">Add/update user</button>
        </form>
    )
}
