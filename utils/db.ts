import { hash, compare } from 'bcrypt-ts'
//const { bcrypt } = 'bcryptjs'
// const bcrypt = require('bcrypt')
import { Redis } from "@upstash/redis"

//export async function genPassword

export async function createUser(redis, username, password) {
    //bcrypt.genSalt(10, function(err, salt) {
    return await hash(password, 10, function(err, hsh) {
        if(err) {
            return false
        }
        redis.hset('USERS', {[username]: hsh})
        redis.hset('PROFILES', {[username]: {displayName: username}})
        return true
      });
}

export async function getUserFromDb(redis, username, password) {
    console.log(`try ${username}`)
    let db_pw = await redis.hget('USERS', username) || ''
    console.log(`have ${db_pw}`)
    const ok = await compare(password, db_pw);
    console.log(`it is ${ok}`)
    if(ok) {
      return await redis.hget('PROFILES', username)
    }
    return null
}
/*
export async function getUserFromDb(redis: Redis, username: string, password: string) {
    let ok = false;
    let db_data : RedisUserData = await redis.hget('USERS', username) || {pw: '', salt: ''}
    let db_pw = db_data.pw
    let salt = db_data.salt
    bcrypt.hash(password, salt, function(err: string, hash: string) {
        bcrypt.compare(db_pw, hash, function(err: string, res: boolean) {
            if (res === true) {
                ok = true
            }
        });
    });
    return ok;
}*/
