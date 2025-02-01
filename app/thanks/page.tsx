import Link from 'next/link'
import Header from '@/components/header'
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
    </Suspense>
    <div id="thanks-box" className="instructions-stim-container">
    <div className="row g-0">
      <div className="col d-flex justify-content-center">
        <h2>Thank you for taking part in this study!</h2>
      </div>
    <div className="row g-0">
      <div className="col d-flex justify-content-center">
      </div>
    </div>
    </div>
    </div>
    </div>
    </main>
    )
}
