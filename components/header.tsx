'use client'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
import { auth } from "@/auth"

export default function Header({sessionObj}:{sessionObj: Promise<any>}) {
  // console.log(`auth is ${auth}`)
  //const req2 = await req
  //const res2 = await res
  const session = use(sessionObj)
    return (
    <div id="header">
      <div className="row">
        <Link href="/" className="col-1 ml-4 z-3">
          <Image src='/img/LITW-logo2020.png' id='logo'
                   alt='The Lab in the Wild logo showing an Earth globe and the name of the site in green colors.'
                   width={220} height={69}
          />
        </Link>
        <div className="col-10 mt-5 text-center z-3"><p className="fs-2"><a href="https://labinthewild.org/">Lab in the Wild</a> clone for HumEval</p></div>
        <div><p className="col-11 text-end fs-6" style={{marginTop: '-55px'}}>Logged in as<br/> {session?.user.name}</p></div>
          <div className="col-11 text-end" style={{marginTop: '-90px', marginLeft: '100px'}}>
          <Link href="/api/auth/signout">
            <button type="button" className="btn btn-outline-primary mt-8 btn">Sign out</button>
          </Link>
          </div>
      </div>
      <div className="row">
      </div>
      <div className='separator'>&nbsp;</div>
    </div>
    );
}
