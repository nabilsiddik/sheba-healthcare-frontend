import { NextResponse, NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './utils/authUtils'
import { deleteCookie, getCookie } from './utils/tokenHandler'

export async function proxy(request: NextRequest) {
  let userRole: UserRole | null = null
  const pathName = request.nextUrl.pathname
  const accessToken = await getCookie('accessToken') || null
  const routerOwner = getRouteOwner(pathName)

  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)

    if (typeof verifiedToken === 'string') {
      await deleteCookie('accessToken')
      await deleteCookie('refreshToken')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    userRole = verifiedToken.role
  }

  // If loged in user tried to access auth routes
  const isAuth = isAuthRoute(pathName)
  if (accessToken && isAuth) {
    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
  }

  // User is trying to access open public route
  if (routerOwner === null) {
    return NextResponse.next()
  }

  if (!accessToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathName)
    return NextResponse.redirect(loginUrl)
  }

  // User is trying to access common protencted routes
  if (routerOwner === 'COMMON') {
    return NextResponse.next()
  }


  // Admin Doctor and Patient access to trying protected routes
  if (routerOwner === 'ADMIN' || routerOwner === 'DOCTOR' || routerOwner === 'PATIENT') {
    if(userRole !== routerOwner){
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/signup'
  ],
}