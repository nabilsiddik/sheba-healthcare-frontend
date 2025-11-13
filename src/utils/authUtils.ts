export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT'
export type RouteConfig = {
  exact: string[],
  patterns: RegExp[]
}

// Exact and pattern routes for auth, common routes and role based routes
export const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
export const commonProtectedRoutes: RouteConfig = {
  exact: ['/my-profile', '/settings'],
  patterns: []
}
export const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/, /^\/appointments/]
}
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/]
}
export const patientProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/]
}


// Check if current route is an auth route
export const isAuthRoute = (pathName: string): boolean => {
  return authRoutes.some((route: string) => route === pathName)
}

// Check if any exact or pattern route matches with current path
export const isRouteMatches = (pathName: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathName)) {
    return true
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathName))
}


// Get route owner
export const getRouteOwner = (pathName: string): 'ADMIN' | 'PATIENT' | 'DOCTOR' | 'COMMON' | null => {
  if (isRouteMatches(pathName, adminProtectedRoutes)) {
    return 'ADMIN'
  }
  if (isRouteMatches(pathName, doctorProtectedRoutes)) {
    return 'DOCTOR'
  }
  if (isRouteMatches(pathName, patientProtectedRoutes)) {
    return 'PATIENT'
  }
  if (isRouteMatches(pathName, commonProtectedRoutes)) {
    return 'COMMON'
  }
  return null
}


// Get default role based dashboard redirect route after login
export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === 'ADMIN') {
    return 'admin/dashboard'
  }
  if (role === 'DOCTOR') {
    return 'doctor/dashboard'
  }
  if (role === 'PATIENT') {
    return '/dashboard'
  }
  return '/'
}


// Checking if requested url before login is actually valid for after login user
export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routerOwner = getRouteOwner(redirectPath)

    if(routerOwner === null || routerOwner === 'COMMON'){
        return true 
    }

    if(routerOwner === role){
        return true
    }

    return false
}