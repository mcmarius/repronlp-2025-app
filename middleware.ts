import { auth } from "@/auth"
// export { auth as middleware } from "@/auth"
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
  //cookies: { sessionToken: { name: `next-auth.session-token`, options: { httpOnly: false } } },
}
export default auth((req) => {
  console.log(`have req ${JSON.stringify(req)} with ${req.nextUrl.pathname}`)
  // for some reason this did not work with the matcher
  if(req.nextUrl.pathname == '/favicon.ico') {
    return NextResponse.next()
  }
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if(req.auth && req.auth.user.role !== process.env.ADMIN_ROLE && (req.nextUrl.pathname.startsWith('/api/admin') || req.nextUrl.pathname.startsWith('/admin'))) {
    return Response.redirect(new URL("/", req.nextUrl.origin))
  }
})

// ?? https://github.com/nextauthjs/next-auth/discussions/10058
