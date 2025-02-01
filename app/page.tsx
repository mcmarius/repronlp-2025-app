import { Suspense } from 'react'

import { auth } from "@/auth"
import Header from '@/components/header'
import Intro from '@/components/intro'

export const dynamic = 'force-dynamic'

export default function Home() {
  const session = auth()
  return (
    <main>
      <div id="content">
        <Suspense>
          <Header sessionObj={session}/>
        </Suspense>
        <Intro/>
      </div>
    </main>
  )
}
