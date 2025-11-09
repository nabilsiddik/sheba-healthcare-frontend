import { NextResponse, NextRequest } from 'next/server'
 
type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT'
type RouteConfig = {
  exact: string[],
  patterns: RegExp[]
}

// Exact and pattern routes for auth, common routes and role based routes
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
const commonProtectedRoutes: RouteConfig = {
  exact: ['/my-profile', '/settings'],
  patterns: []
}
const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/, /^\/appointments/]
}
const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/]
}
const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/]
}


// Check if current route is an auth route
const isAuthRoute = (pathName: string): boolean => {
  return authRoutes.some((route: string) => route === pathName)
}

// Check if any exact or pattern route matches with current path
const isRouteMatches = (pathName: string, routes: RouteConfig): boolean => {
  if(routes.exact.includes(pathName)){
    return true
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathName))
}


// Get route owner
const getRouteOwner = (pathName: string): 'ADMIN' | 'PATIENT' | 'DOCTOR' | 'COMMON' | null => {
  if(isRouteMatches(pathName, adminProtectedRoutes)){
    return 'ADMIN'
  }
  if(isRouteMatches(pathName, doctorProtectedRoutes)){
    return 'DOCTOR'
  }
  if(isRouteMatches(pathName, patientProtectedRoutes)){
    return 'PATIENT'
  }
  if(isRouteMatches(pathName, commonProtectedRoutes)){
    return 'COMMON'
  }
  return null
}


// Get default role based dashboard redirect route after login
const getDefaultDashboardRoute = (role: UserRole): string => {
  if(role === 'ADMIN'){
    return 'admin/dashboard'
  }
  if(role === 'DOCTOR'){
    return 'doctor/dashboard'
  }
  if(role === 'PATIENT'){
    return '/dashboard'
  }
  return '/'
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