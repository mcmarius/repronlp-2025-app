import { Suspense } from 'react'

import { auth } from "@/auth"
import Header from '@/components/header'
import Instructions from '@/components/instructions'

export const dynamic = 'force-dynamic'

export default function Home() {
  const session = auth()
  return (
    <div id="content">
      <Suspense>
        <Header sessionObj={session}/>
      </Suspense>
      <Instructions/>
    </div>
    )
}
