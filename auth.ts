import NextAuth, { type DefaultSession, type User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { cookies } from 'next/headers'

//import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis"

import { getUserFromDb } from "@/utils/db"
 
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

interface SafeUserType {
  id?: string,
  email?: string,
  name?: string,
  username?: string,
  password?: string,
  displayName?: string,
  role?: string,
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: SafeUserType, // your user type
    role: string
  }

  interface User extends SafeUserType {}
}

import { Session } from 'next-auth'

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: string,
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  //adapter: UpstashRedisAdapter(redis, { baseKeyPrefix: "repronlp-2025-definitions:" }),
  debug: false,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(`in signin callback w/ ${credentials}`)
      return true
    },
    async session({ session, user, token }: {session: Session, user: User, token: JWT}) {
      session.user.role = token.role
      // console.log(`in session callback w/ ${JSON.stringify(session)} and ${user} ${token}`)
      return session
    },
    async jwt({ token, user }: {token: JWT, user: User}) {
      // console.log(`in jwt callback w/ ${JSON.stringify(token)} and ${user} ${account} ${profile}`)
      if (user) {
        token.user = user
        token.role = user.role || 'user'
      }
      return token;
    },
  },
  session: {strategy: "jwt"},
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        try {
          let user : User = {}
          user = await getUserFromDb(redis, credentials.username as string, credentials.password as string) as User
          // console.log(`trying user ${credentials.username}, got ${JSON.stringify(user)}`) 
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }
          if(!user['role'])
              user['role'] = 'user'
          // console.log('here')
   
          // return user object with their profile data
          if(user != null && user != undefined)
              return {_id: 1, email: '', name: credentials.username, role: user.role} as User
          return null
        } catch (error) {
            console.log('Auth error')
            return null
        }
        return null
      },
      //authorized: async ({ auth }) => {
      //  //return true
      //  // Logged in users are authenticated, otherwise redirect to login page
      //  console.log(`in authorized: ${auth}`)
      //  return !!auth
      //},
    }),
  ],
})

export async function API(path: string, method: string, params?: Record<string, string>, body?: BodyInit) {
    const cookieStore = await cookies()
    const session = await auth()
    // console.log(`admin data auth ${JSON.stringify(session)}`)
    const user = session?.user.name || 'unknown_user'
    const csrfPrefix = process.env.VERCEL ? '__Host-' : ''
    const cookiePrefix = process.env.VERCEL ? '__Secure-' : ''
    const csrf0 = cookieStore.get(`${csrfPrefix}authjs.csrf-token`) || {value: ''}
    const token = cookieStore.get(`${cookiePrefix}authjs.session-token`)
    const baseURL = process.env.VERCEL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'
    const baseURLencoded = encodeURIComponent(baseURL)
    const csrf = encodeURIComponent(csrf0?.value)
    const newCookie = `${csrfPrefix}authjs.csrf-token=${csrf}; ${cookiePrefix}authjs.callback-url=${baseURLencoded}; ${cookiePrefix}authjs.session-token=${token?.value}`
    let queryParams = ''
    if(params)
      queryParams = '?' + new URLSearchParams(params).toString()
    const response = await fetch(`${baseURL}${path}${queryParams}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Cookie': newCookie },
        body: body
    })
    const result = await response.json()
    // console.log(`[DEBUG] response from API: ${JSON.stringify(result)}`)
    return result
}
