import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/header'
import TaskForm from '@/components/task-form'
//import { terms, definitions } from '@/lib/seed'

import { promises as fs } from 'fs'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

import terms from "@/app/terms.json"
import { auth } from "@/auth"
import definitions from "@/app/definitions.json"
export const dynamic = 'force-dynamic'

interface Query {
  id: number;
  // Add other properties as needed
}

export default async function Page({params,}: {params: Promise<{ id: string }>}) {
  const session = await auth()
  console.log(`sess: ${JSON.stringify(session)}`)
  let idStr = (await params).id
  let id = Number(idStr) || 0
  if(id < 1 || id > 300) {
        id = 1
        idStr = '1'
  }
  //const termsFile = await fs.readFile(process.cwd() + '/utils/terms.json', 'utf8');
  //const terms = JSON.parse(termsFile);
  //const definitionsFile = await fs.readFile(process.cwd() + '/utils/definitions.json', 'utf8');
  //const definitions = JSON.parse(definitionsFile);
  // console.log(terms)
  //console.log(definitions[0])
  const term = terms.find((q: Query) => q.id == definitions[id - 1]['term_id'])
  //console.log(term)
  return (
    <main>
    <div id="content">
    <Header/>
    <TaskForm uid={session?.user.name || 'unknown_user'} id={idStr} term={term?.term_text || ''} definition={definitions[id - 1].def_text}/>
    </div>
    </main>
    )
}
