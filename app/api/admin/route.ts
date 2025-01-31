// import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis'
import { auth } from "@/auth"

import { createUser } from "@/utils/db"

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})
//import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const GET = auth(async function GET(req) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  if(req.auth.user.role !== process.env.ADMIN_ROLE)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  const query = req.nextUrl.searchParams
  const command = query.get('command')
  const uid = query.get('uid')
  console.log(`[DEBUG] get admin ${command}`)
  //const query = req.query
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
  //const query = req.query
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
  //const query = req.query
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
/*
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  // console.log(`auth is ${auth}`)
  /*const req2 = await req
  const res2 = await res
  const session = await auth(req2, res2)
  if(!session) {
      res.status(401).json({error: "Unauthorized"})
      return
  }
  if(session.user.role !== process.env.ADMIN_ROLE) {
      res.status(403).json({error: "Forbidden"})
      return
  }* /
  const query = req.query
  // console.log(`in admin handler ${query.command} ${query.uid}`)
  let db_response = null
  if(query.command === "get_user" && query.uid) {
      db_response = await redis.hget('PROFILES', query.uid)
  }
  else if(query.command === "delete_user" && query.uid) {
      db_response = await redis.hdel('PROFILES', query.uid)
      db_response = await redis.del(`USERS#${query.uid}`)
  }
  else if(query.command === "create_user" && query.uid && query.pw) {
      db_response = await createUser(redis, query.uid, query.pw, query.role || 'user')
  }
  //else if(query.command === "get_question" && query.uid && query.qid)
  //    db_response = await redis.hgetall(`RESPONSES`#${query.uid}#${query.qid}`)
  else if(query.command === "get_questions" && query.uid) {
      db_response = await redis.hget(`RESPONSES`, query.uid)
      //db_response = []
      //for(let i = 0; i < 3; i++) {
      //    db_response += [await redis.hgetall(`RESPONSES#${query.uid}#${i}`)]
      //}
  }
  else if(query.command === "get_consent" && query.uid)
      db_response = await redis.hgetall(`USER_CONSENTS`)
  console.log(db_response)

  res.status(200).json({ data: db_response });
};
*/