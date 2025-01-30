import NextAuth, { type DefaultSession, type User } from "next-auth"
import { ZodError } from "zod"
import { signInSchema } from "./lib/zod"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"
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
  displayName?: string
}
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: SafeUserType; // your user type
  }

  interface User extends SafeUserType {}
}
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
  }
}
//declare module 'next-auth/jwt' {
//  interface Database {
//    user: SafeUserType;
//  }
//}


const APP_USERS = ['test1', 'test2']

export const { handlers, signIn, signOut, auth } = NextAuth({
  //adapter: UpstashRedisAdapter(redis, { baseKeyPrefix: "repronlp-2025-definitions:" }),
  debug: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(`in signin callback w/ ${credentials}`)
      return true // APP_USERS.include(profile.username)
    },
    async session({ session, user, token }) {
      // console.log(`in session callback w/ ${JSON.stringify(session)} and ${user} ${token}`)
      return session
    },
    async jwt({ token, user, account, profile }) {
      // console.log(`in jwt callback w/ ${JSON.stringify(token)} and ${user} ${account} ${profile}`)
      if (user) {
        token.user = user;
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
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // console.log('first')
        try {
          let user = null
          // console.log('second')
          // const { username, password } = await signInSchema.parseAsync(credentials)
          // console.log('third')
          // console.log(`trying user ${credentials.username} 1`) 
          // logic to salt and hash password
          // const pwHash = saltAndHashPassword(credentials.password)
   
          // logic to verify if the user exists
          user = await getUserFromDb(redis, credentials.username as string, credentials.password as string)
          // console.log(`trying user ${credentials.username}, got ${JSON.stringify(user)}`) 
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }
          // console.log('here')
   
          // return user object with their profile data
          if(user != null && user != undefined)
              return {_id: 1, email: '', name: credentials.username} as User
          return null // {username: credentials.username, password}
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
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