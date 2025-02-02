
import { MouseEvent } from 'react'

import { API } from '@/auth'
import AdminExportResponses from '@/components/admin-export-responses'

export default async function AdminUserResponses() {
    const getResponsesParams = {command: "get_responses"}
    const responses = await API('/api/admin', 'GET', getResponsesParams)
    //console.log(`admin data: ${Object.entries(responses.data)}`)
    //Object.entries(responses.data).map((response) => (
    //    console.log(`-> ${response[0]} with ${response[1].q1}`)
    //))
    return (
      <main>
        <AdminExportResponses responses={JSON.stringify(responses.data)}/>
        <h4 className="ml-4">Responses</h4>
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
            {Object.entries(responses.data).map((response: any[], i) => (
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
      </main>
    )
}
