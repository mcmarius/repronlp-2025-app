'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface CreateUserProps {
  baseURL: string;
  cookie: string;
}

export default function AdminCreateUser(props: CreateUserProps) {
    const router = useRouter()
    const baseURL = props.baseURL
    const cookie = props.cookie

    const onSubmitCreateUser = async ( event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const uid = form.querySelector('input[name="uid"]') as HTMLInputElement;
      const pw = form.querySelector('input[name="pw"]') as HTMLInputElement;
      const role = form.querySelector('input[name="role"]') as HTMLInputElement;
      const createUserParams = new URLSearchParams({command: "create_user", uid: uid.value, pw: pw.value, role: role.value}).toString()
      await fetch(`${baseURL}/api/admin?${createUserParams}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
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
            <input id="add-user-user" className="form-control" name="uid" defaultValue="testuser" type="text"/>
            </div>
          </div>
          <div className="row">
            <div className="col-1 form-label">
            <label htmlFor="add-user-pw">Password</label>
            </div>
            <div className="col-2">
              <input id="add-user-pw" className="form-control" name="pw" type="password"/>
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
          <button type="submit" id="add-user-button" className="btn btn-outline-primary btn">Add user</button>
        </form>
    )
}
