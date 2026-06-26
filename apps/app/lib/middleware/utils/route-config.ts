const PUBLIC_EXACT = new Set(["/", "/forgot-password"])

/** Prefix-match public paths */
const PUBLIC_PREFIXES = ["/auth/reset-password", "/auth/verify-email"]

export function isPublicRoute(pathname: string): boolean {
  return (
    PUBLIC_EXACT.has(pathname) ||
    PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))
  )
}

const AUTH_EXACT = new Set(["/login", "/signup"])

export function isAuthRoute(pathname: string): boolean {
  return AUTH_EXACT.has(pathname)
}

const SENSITIVE_PREFIXES = [
  "/settings/billing",
  "/settings/security",
  "/account/password",
]

export function isSensitiveRoute(pathname: string): boolean {
  return SENSITIVE_PREFIXES.some((p) => pathname.startsWith(p))
}

export const ONBOARDING_PREFIX = "/onboarding"

export function isOnboardingRoute(pathname: string): boolean {
  return pathname.startsWith(ONBOARDING_PREFIX)
}

// Dashboard root — paths that should redirect to the user's default workspace
// Add top-level app paths here as your app grows.

const WORKSPACE_ROOT_PATHS = new Set(["/", "/dashboard", "/login", "/signup"])

export function isWorkspaceRootPath(pathname: string): boolean {
  return WORKSPACE_ROOT_PATHS.has(pathname)
}
