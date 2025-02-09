import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { auth } from "@/auth"
import AdminData from '@/components/admin-data'
import Header from '@/components/header'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const sessionObj = auth()
  const session = await auth()
  if (session?.user.role !== process.env.ADMIN_ROLE) {
      redirect('/')
  }
  
  return (
    <main>
      <div id="content">
        <Suspense>
          <Header sessionObj={sessionObj}/>
          <AdminData/>
        </Suspense>
      </div>
    </main>
    )
}
