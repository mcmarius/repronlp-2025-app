import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/header'
import Instructions from '@/components/instructions'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'
import { auth } from "@/auth"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await auth()
  return (
    <main>
    <div id="content">
    <Header/>
    <Instructions/>
    </div>
    </main>
    )
}
