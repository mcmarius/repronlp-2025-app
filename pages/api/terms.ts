import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const response = req.body;
  // Save the answers to Redis
  // ...
  // console.log(`got ${response} from client`)
  //console.log(response)
  var now = new Date();
  console.log(`[INFO][${now.toISOString()}] make redis consent query with key ${response.uid} and value yes`)
  await redis.hset('USER_CONSENTS', {uid: response.uid, consent: 'yes', ts: now})

  res.status(201).json({ message: 'Form submitted successfully' });
};
