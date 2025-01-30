import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const response = req.body;
  // Save the answers to Redis
  // ...
  // console.log(`got ${response} from client`)
  //console.log(response)
  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })
  var now = new Date();
  console.log(`[INFO][${now.toISOString()}] make redis query with key ${response.uid}#${response.qid} and value ${JSON.stringify(response.data)}`)
  await redis.hset(`${response.uid}#${response.qid}`, response.data)

  res.status(201).json({ message: 'Form submitted successfully' });
};
