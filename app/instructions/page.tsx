import { Suspense } from 'react'

import { auth } from "@/auth"
import Header from '@/components/header'
import Instructions from '@/components/instructions'

import definitions from "@/app/definitions.json"
import terms from "@/app/terms_by_category.json"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await auth()
  const sessionObj = auth()
  let total = 300
  const role = session?.user.role || 'user'
  let roleTerms = terms.filter((term) => term.domain == role.split("user-")[1])
  if(roleTerms.length == 0) {
    roleTerms = terms
  }
  const termIds = roleTerms.map((term) => term.id)
  const roleDefinitions = definitions.filter((definition) => termIds.includes(definition['term_id']))
  total = roleDefinitions.length
  return (
    <div id="content">
      <Suspense>
        <Header sessionObj={sessionObj}/>
      </Suspense>
      <Instructions total={total}/>
    </div>
    )
}
