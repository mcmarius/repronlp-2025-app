'use client'
import { MouseEvent, useState } from 'react'

import { AdminAPI } from '@/components/admin-api'
import AdminExportItems from '@/components/admin-export-items'

interface ResponsesListParams { responses: object }

function Responses(params: ResponsesListParams) {
  const responses = params.responses
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User#question</th>
          <th scope="col">Factually inacurrate?</th>
          <th scope="col">How inacurrate?</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(responses).map((response: any[], i) => (
          <tr id={`response-${i}`} key={i} className="col-2">
            <th scope="row">{i + 1}</th>
            <td>{response[0]}</td>
              <td>{response[1].q1}</td>
              <td>{response[1].q2}</td>
              <td>{response[1].ts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function AdminUserResponses() {
    const getResponsesParams = {command: "get_responses"}
    const [responses, setResponses] = useState({});

    const onFetchClick = () => {
      if (Object.entries(responses).length == 0) {
        AdminAPI(setResponses, getResponsesParams, 'GET')
      }
    }
    return (
      <main>
        <h4 className="ml-4">Responses</h4>
        <button className="btn btn-outline-primary" onClick={onFetchClick}>Fetch responses
        </button>
        {Object.entries(responses).length > 0 &&  <AdminExportItems items={JSON.stringify(responses)} name='responses'/>}
        {Object.entries(responses).length > 0 && <Responses responses={responses} />}
      </main>
    )
}
