import { NextResponse } from "next/server"
import { Redis } from '@upstash/redis'
import { auth } from "@/auth"

import { createUser } from "@/utils/db"

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export const POST = auth(async function POST(req) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const uid = body.uid
  // console.log(`task got uid ${uid} w/ req auth: ${JSON.stringify(req.auth)}`)
  if(req.auth.user.name !== uid) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  }
  const qid = body.qid
  let qdata = body.data
  const now = new Date();
  qdata.ts = now
  console.log(`[INFO][${now.toISOString()}] make redis query with key ${uid}#${qid} and value ${JSON.stringify(qdata)}`)
  await redis.hset(`RESPONSES`, {[`${uid}#${qid}`]: qdata})

  return NextResponse.json({ message: 'Form submitted successfully' }, {status: 201})
}) as any;
