import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/header'
import Task from '@/components/task'

import { Suspense } from 'react'
import ExpandingArrow from '@/components/expanding-arrow'

export const dynamic = 'force-dynamic'

export default async function Page({params,}: {params: Promise<{ id: string }>}) {
  const id = (await params).id
  return (
    <main>
    <div id="content">
    <Header/>
    {/*TODO: pass term and definition as fetched from db*/} 
    <Task id={id}/>
    </div>
    </main>
    )
}
