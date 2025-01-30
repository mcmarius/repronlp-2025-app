import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/header'
import InformedConsent from '@/components/informed-consent'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main>
    <div id="content">
    <Header/>
    <InformedConsent/>
    </div>
    </main>
    )
}

