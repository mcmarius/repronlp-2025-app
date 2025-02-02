import { auth, API } from "@/auth"

import definitions from "@/app/definitions.json"
import terms from "@/app/terms.json"

import Header from '@/components/header'
import TaskForm from '@/components/task-form'

export const dynamic = 'force-dynamic'

interface Query {
  id: number;
}

export default async function Page({params,}: {params: Promise<{ id: string }>}) {
  const session = await auth()
  const sessionObj = auth()
  let idStr = (await params).id
  let id = Number(idStr) || 0
  if(id < 1 || id > 300) {
        id = 1
        idStr = '1'
  }
  // console.log(terms)
  //console.log(definitions[0])
  const term = terms.find((q: Query) => q.id == definitions[id - 1]['term_id'])
  //console.log(term)
  const existing = await API(`/api/tasks/${id}`, 'GET')
  const q1 = existing.message.q1
  const q2 = existing.message.q2
  // console.log(`got q1 ${q1} and q2 ${q2}`)
  return (
    <div id="content">
      <Header sessionObj={sessionObj}/>
      <TaskForm uid={session?.user.name || 'unknown_user'}
        id={idStr} term={term?.term_text || ''} definition={definitions[id - 1].def_text} q1={q1} q2={q2} />
    </div>
    )
}
