'use client'

import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'

import { auth } from "@/auth"

export default function Header({sessionObj}:{sessionObj: Promise<any>}) {
  const session = use(sessionObj)
  const user = session?.user.name

  return (
    <div id="header">
      <div className="row position-relative g-0">
        <Link href="/" className="col-1 ml-4 mt-3 z-3">
          <h2>Home</h2>
        </Link>
        <div id="title" className="position-absolute text-center mt-4"><p className="fs-2">ReproHum – Evaluation of computer-generated scientific definitions</p></div>
        <div className="col">
          <div className="dropdown dropdown-end position-absolute end-5 z-2 mt-3">
            <button type="button" className="btn btn-sm btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              Logged in as {user}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link href="/api/auth/signout">
                  <button type="button" className="dropdown-item btn">Sign out</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='separator'>&nbsp;</div>
    </div>
  );
}
