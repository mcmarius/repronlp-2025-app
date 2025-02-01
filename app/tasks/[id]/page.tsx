import { auth } from "@/auth"

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
  return (
    <div id="content">
      <Header sessionObj={sessionObj}/>
      <TaskForm uid={session?.user.name || 'unknown_user'} id={idStr} term={term?.term_text || ''} definition={definitions[id - 1].def_text}/>
    </div>
    )
}
