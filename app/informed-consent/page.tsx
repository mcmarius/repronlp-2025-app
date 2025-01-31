import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/header'
import InformedConsent from '@/components/informed-consent'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'
import { auth } from "@/auth"

export const dynamic = 'force-dynamic'

export default function Home() {
  const session = auth()
  return (
    <main>
    <div id="content">
    <Suspense>
    <Header sessionObj={session}/>
    <InformedConsent sessionObj={session}/>
    </Suspense>
    </div>
    </main>
    )
}

