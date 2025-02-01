import { Suspense } from 'react'

import { auth } from "@/auth"
import Header from '@/components/header'

export const dynamic = 'force-dynamic'

export default function Home() {
  const session = auth()
  return (
    <div id="content">
      <Suspense>
        <Header sessionObj={session}/>
      </Suspense>
      <div id="thanks-box" className="instructions-stim-container">
        <div className="row g-0">
          <div className="col d-flex justify-content-center">
            <h2>Thank you for taking part in this study!</h2>
          </div>
        </div>
      </div>
    </div>
    )
}
