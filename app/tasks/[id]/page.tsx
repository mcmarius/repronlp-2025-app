import { auth, API } from "@/auth"

import definitions from "@/app/definitions.json"
import terms from "@/app/terms_by_category.json"

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
  let total = 300
  const role = session?.user.role || 'user'
  let roleTerms = terms.filter((term) => term.domain == role.split("user-")[1])
  if(roleTerms.length == 0) {
    roleTerms = terms.filter((term) => term.domain != "demo")
  }
  const termIds = roleTerms.map((term) => term.id)
  const roleDefinitions = definitions.filter((definition) => termIds.includes(definition['term_id']))
  total = roleDefinitions.length
  if(id < 1 || id > total) {
    id = 1
    idStr = '1'
  }
  // console.log(terms)
  //console.log(definitions[0])
  const term = roleTerms.find((q: Query) => q.id == roleDefinitions[id - 1]['term_id'])
  //console.log(term)
  const existing = await API(`/api/tasks/${id}`, 'GET')
  const q1 = existing.message.q1
  const q2 = existing.message.q2
  // console.log(`got q1 ${q1} and q2 ${q2}`)
  return (
    <div id="content">
      <Header sessionObj={sessionObj}/>
      <TaskForm uid={session?.user.name || 'unknown_user'}
        id={idStr} term={term?.term_text || ''} definition={roleDefinitions[id - 1].def_text} q1={q1} q2={q2} total={total} />
    </div>
    )
}
