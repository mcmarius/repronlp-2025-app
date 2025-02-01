//'use client'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Header from '@/components/header'
import AdminData from '@/components/admin-data'
import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'
import { auth } from "@/auth"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const sessionObj = auth()
  const session = await auth()
  // const baseURL = process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  // console.log(process.env.ADMIN_ROLE)
  // console.log(`have ${JSON.stringify(session.user)}`)
  if (session?.user.role !== process.env.ADMIN_ROLE) {
      redirect('/')
  }
  //const usersData = await fetch(`${baseURL}/api/admin`, "command=get_users", {
  //      method: 'GET',
  //      headers: { 'Content-Type': 'application/json' }})
  //const users = await usersData.json()
  // console.log(`admin page: ${JSON.stringify(users)}`)
  
  
  return (
    <main>
    <div id="content">
    <Suspense>
    <Header sessionObj={sessionObj}/>
    <AdminData/>
    </Suspense>
    {/*<AdminForm uid={session?.user.name || 'unknown_user'}/>*/}
    </div>
    </main>
    )
}

