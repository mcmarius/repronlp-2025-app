import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/header'
import Intro from '@/components/intro'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main>
    <div id="content">
    <Header/>
    <Suspense>
    <Intro/>
    </Suspense>
    </div>
    </main>
    )
}
