'use client'

import { useState, FormEvent } from 'react'

import { AdminAPI } from '@/components/admin-api'
import AdminExportItems from '@/components/admin-export-items'

export default function AdminUserLogs() {
    const [logs, setLogs] = useState({})
    let [uid, setUid] = useState("")

    const onFetchClick = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.target as HTMLFormElement;
      const uidForm = form.querySelector('input[name="log-uid"]') as HTMLInputElement;
      setUid(uidForm.value)
      uid = uidForm.value
      // console.log(`got uid ${uid.value}, len: ${Object.entries(logs).length}`)
      const getLogsParams = {command: "get_logs", uid: uid}
      AdminAPI(setLogs, getLogsParams, 'GET')

      // remove previous export button
      const buttonId = `dl-button-logs`
      const old = document.getElementById(buttonId) as HTMLElement;
      if (old) {
        let parent1 = old.parentNode as HTMLElement;
        parent1.removeChild(old);
      }
    }
    return (
      <div>
        <h4 className="ml-4">User logs</h4>
        <form onSubmit={onFetchClick}>
          <div className="row g-0">
            <div className="col-1">
            <label className="form-label" htmlFor="log-user-id">User</label>
            </div>
            <div className="col-2">
            <input required id="log-user-id" className="form-control" name="log-uid" defaultValue="" type="text" />
            </div>
          </div>
          <button className="btn btn-outline-primary" >Fetch logs
          </button>
        </form>
        {Object.entries(logs).length > 0 &&  <AdminExportItems items={JSON.stringify(logs)} text='logs' name={`logs-${uid}`} />}
      </div>
    )
}