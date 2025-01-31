import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis'
import { auth } from "@/auth"

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  /*const session = await auth(req)
  if(!session) {
      res.status(401).json({error: "Unauthorized"})
      return
  }
  // TODO assert session uid == params uid
  if(session.user.name !== params.uid) {
      res.status(403).json({error: "Forbidden"})
      return
  }*/
  const params = req.body;
  var now = new Date();
  console.log(`[INFO][${now.toISOString()}] make redis query with key ${params.uid}#${params.qid} and value ${JSON.stringify(params.data)}`)
  params.data.ts = now
  await redis.hset(`RESPONSES`, {[`${params.uid}#${params.qid}`]: params.data})

  res.status(201).json({ message: 'Form submitted successfully' });
};
