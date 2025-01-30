import { auth } from "@/auth"
//export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
  cookies: { sessionToken: { name: `next-auth.session-token`, options: { httpOnly: false } } },
}
export default auth((req) => {
  // console.log(`have req ${JSON.stringify(req)} with ${req.nextUrl.pathname}`)
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
 // return Response.redirect(new URL("/", req.nextUrl.origin))
})
