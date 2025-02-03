import { NextResponse } from "next/server"
import { Redis } from '@upstash/redis'

import { auth } from "@/auth"

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export const POST = auth(async function POST(req) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const uid = req.auth.user.name || 'unknown_user'
  // console.log(`terms got uid ${uid} w/ req auth: ${JSON.stringify(req.auth)}`)
  const now = new Date();
  console.log(`[INFO][${now.toISOString()}] make redis consent query with key ${uid} and value yes`)
  await redis.hset(`USER_CONSENTS`, {[uid]: {consent: 'yes', ts: now}})

  return NextResponse.json({ message: 'Form submitted successfully' }, {status: 201})
}) as any;

// this endpoint is not really needed
export const GET = auth(async function GET(req) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const uid = req.auth.user.name || 'unknown_user'
  // console.log(`terms got uid ${uid} w/ req auth: ${JSON.stringify(req.auth)}`)
  const now = new Date();
  console.log(`[INFO][${now.toISOString()}] make redis consent hget query with key ${uid}`)
  const response = await redis.hget(`USER_CONSENTS`, uid) || ''

  return NextResponse.json({ message: response }, {status: 200})
}) as any;
