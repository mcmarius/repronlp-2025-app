import { NextResponse } from "next/server"
import { Redis } from '@upstash/redis'

import { auth } from "@/auth"

import definitions from "@/app/definitions.json"
import terms from "@/app/terms_by_category.json"

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export const POST = auth(async function POST(req, { params }) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const uid = req.auth.user.name
  const role = req.auth.user.role || ''
  let qid = String((await params || {}).qid)
  if (role.startsWith("user-")) {
    console.log(`role qid: ${qid}`)
    // we need to find the original question id
    let roleTerms = terms.filter((term) => term.domain == role.split("user-")[1])
    if(roleTerms.length == 0) {
      roleTerms = terms.filter((term) => term.domain != "demo")
    }
    const termIds = roleTerms.map((term) => term.id)
    const roleDefinitions = definitions.filter((definition) => termIds.includes(definition['term_id']))
    qid = String(definitions.indexOf(roleDefinitions[parseInt(qid) - 1]) + 1)
    console.log(`original qid: ${qid}`)
  }
  // const qid = body.qid
  let qdata = body
  // console.log(`${qdata.q1}`)
  if (qdata.q1 != "Yes" && qdata.q1 != "No") {
    return NextResponse.json({ message: "q1 must be Yes or No" }, { status: 422 })
  }
  const q2 = Number(qdata.q2) || 0
  if (qdata.q1 == "Yes" && (q2 < 1 || q2 > 4)) {
    return NextResponse.json({ message: "q2 must be from 1 to 4" }, { status: 422 })
  }
  const now = new Date();
  qdata.ts = now
  console.log(`[INFO][${now.toISOString()}] make redis query with key ${uid}#${qid} and value ${JSON.stringify(qdata)}`)
  await redis.hset(`RESPONSES`, {[`${uid}#${qid}`]: qdata})
  qdata.qid = qid
  await redis.lpush(`LOGS-${uid}`, JSON.stringify(qdata))

  return NextResponse.json({ message: 'Response saved' }, {status: 201})
}) as any;

interface DBResponse {
  q1: string,
  q2: string,
  ts: string
}

export const GET = auth(async function GET(req, { params }) {
  if(!req.auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const query = req.nextUrl.searchParams
  const uid = req.auth.user.name
  const role = req.auth.user.role || ''
  let qid = String((await params || {}).qid)
  if (role.startsWith("user-")) {
    console.log(`role qid: ${qid}`)
    // we need to find the original question id
    let roleTerms = terms.filter((term) => term.domain == role.split("user-")[1])
    if(roleTerms.length == 0) {
      roleTerms = terms.filter((term) => term.domain != "demo")
    }
    const termIds = roleTerms.map((term) => term.id)
    const roleDefinitions = definitions.filter((definition) => termIds.includes(definition['term_id']))
    qid = String(definitions.indexOf(roleDefinitions[parseInt(qid) - 1]) + 1)
    console.log(`original qid: ${qid}`)
  }
  const now = new Date();
  console.log(`[INFO][${now.toISOString()}] make redis hget query with key ${uid}#${qid}`)
  const dbResponse = await redis.hget(`RESPONSES`, `${uid}#${qid}`) as DBResponse
  if (!dbResponse) {
    // easier for frontend side
    return NextResponse.json({ message: {q1: "", q2: ""}}, {status: 200})
  }
  // console.log(`[INFO][${now.toISOString()}] redis response ${JSON.stringify(dbResponse)}`)
  // no need to expose timestamp
  const response = (({ts, ...rest}) => rest)(dbResponse)

  return NextResponse.json({ message: response }, {status: 200})
}) as any;
