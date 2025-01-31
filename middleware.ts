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
/*
export function middleware(request: NextRequest) {
  const sess = auth(request)
  console.log(`mid sess ${sess}`)
  let cookie = request.cookies.get('authjs.session-token')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  //const allCookies = request.cookies.getAll()
  //console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

  return NextResponse.next()
}
*/
