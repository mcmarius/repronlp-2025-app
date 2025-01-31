import { hash, compare } from 'bcrypt-ts'
import { Redis } from "@upstash/redis"

export async function createUser(redis: Redis, username: string, password: string, role: string) {
    const hsh = await hash(password, 10) //, function(err, hsh) {
    redis.set(`USERS#${username}`, hsh)
    redis.hset('PROFILES', {[username]: {displayName: username, role: role}})
}

export async function getUserFromDb(redis: Redis, username: string, password: string) {
    //console.log(`try ${username}`)
    let db_pw = await redis.get(`USERS#${username}`) as string || ''
    //console.log(`have ${db_pw}`)
    const ok = await compare(password, db_pw);
    //console.log(`it is ${ok}`)
    if(ok) {
      return await redis.hget('PROFILES', username)
    }
    return null
}
