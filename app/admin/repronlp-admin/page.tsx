//'use client'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Header from '@/components/header'
//import AdminForm from '@/components/admin-form'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'
import { auth } from "@/auth"

export const dynamic = 'force-dynamic'

export default function Home() {
  const session = auth()
  // console.log(process.env.ADMIN_ROLE)
  // console.log(`have ${JSON.stringify(session.user)}`)
  /*if (session?.user.role !== process.env.ADMIN_ROLE) {
      redirect('/')
      return (
        <main>
        <div id="content">
        <Header session={session}/>
          <h2>Forbidden</h2>
        </div>
        </main>
      )
  }*/
  
  
  return (
    <main>
    <div id="content">
    <Suspense>
    <Header sessionObj={session}/>
    </Suspense>
    {/*<AdminForm uid={session?.user.name || 'unknown_user'}/>*/}
    </div>
    </main>
    )
}

