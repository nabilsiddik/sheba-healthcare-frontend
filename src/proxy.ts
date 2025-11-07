import { NextResponse, NextRequest } from 'next/server'
 
type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT'
type RouteConfig = {
  exact: string[],
  pattern: RegExp[]
}

const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
const commonProtectedRoutes: RouteConfig = {
  exact: ['/my-profile', '/settings'],
  pattern: []
}
const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/doctor/, /^\/appointments/]
}
const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin/]
}
const patientProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/dashboard/]
}

export function proxy(request: NextRequest) {
  console.log(request.nextUrl.pathname, 'path namee')
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/signup'
  ],
}