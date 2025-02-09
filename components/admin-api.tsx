'use client'

export function AdminAPI (setState: (obj: object) => void, params: Record<string, string>, method: string) {
  const commandParams = new URLSearchParams(params).toString()
  return fetch(`/api/admin?${commandParams}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => res.json())
  .then((res) => {
    // console.log(res)
    //console.log(`admin data: ${Object.entries(res.data)}`)
    //Object.entries(res.data).map((response) => (
    //    console.log(`-> ${response[0]} with ${response[1].q1}`)
    //))
    setState(res.data)
  })
}