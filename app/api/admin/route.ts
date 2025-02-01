import { NextResponse } from "next/server"
import { Redis } from '@upstash/redis'

import { auth } from "@/auth"
import { createUser } from "@/utils/db"

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// Maybe TODO to avoid the workaround with "as any"
// https://github.com/nextauthjs/next-auth/issues/12224

export const GET = auth(async function GET(req) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  if(req.auth.user.role !== process.env.ADMIN_ROLE)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  const query = req.nextUrl.searchParams
  const command = query.get('command')
  const uid = query.get('uid')
  console.log(`[DEBUG] get admin ${command}`)

  let db_response = null
  if(command === "get_user" && uid) {
      db_response = await redis.hget('PROFILES', uid)
  }
  else if(command === "get_users") {
      db_response = await redis.hgetall('PROFILES')
  }
  else if(command === "get_responses") {
      db_response = await redis.hgetall(`RESPONSES`)
  }
  else if(command === "get_consent") {
      db_response = await redis.hgetall(`USER_CONSENTS`)
  }
  // console.log(`[DEBUG] get admin ${JSON.stringify(db_response)}`)
  return NextResponse.json({ data: db_response }, { status: 200 })
}) as any;

export const POST = auth(async function POST(req) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  if(req.auth.user.role !== process.env.ADMIN_ROLE)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  const query = req.nextUrl.searchParams
  const command = query.get('command')
  const uid = query.get('uid')
  const pw = query.get('pw')
  const role = query.get('role')
  console.log(`[DEBUG] post admin ${command}`)

  let db_response = null
  if(command === "create_user" && uid && pw) {
      db_response = await createUser(redis, uid, pw, role || 'user')
  }
  return NextResponse.json({ data: db_response }, { status: 201 })
}) as any;

export const DELETE = auth(async function DELETE(req) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  if(req.auth.user.role !== process.env.ADMIN_ROLE)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  const query = req.nextUrl.searchParams
  const command = query.get('command')
  const uid = query.get('uid')
  const key = query.get('key')
  console.log(`[DEBUG] delete admin ${command}`)

  let db_response = null
  if(command === "delete_user" && uid) {
      await redis.hdel('PROFILES', uid)
      await redis.del(`USERS#${uid}`)
      db_response = 'deleted user'
  }
  if(command === "delete_response" && key) {
      await redis.hdel('RESPONSES', key)
      db_response = 'deleted response'
  }
  return NextResponse.json({ data: db_response }, { status: 200 })
}) as any;
