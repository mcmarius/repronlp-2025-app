import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/header'
import Instructions from '@/components/instructions'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main>
    <div id="content">
    <Header/>
    <Instructions/>
    </div>
    </main>
    )
}
