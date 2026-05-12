const PUBLIC_ROUTE_PATTERNS = [
  // Exact matches
  "/health",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
  "/api/auth/verify-email/resend",
  // TODO: Add Better Auth-specific routes

  // Pattern matches (startsWith)
  "/public/",
  "/api/auth/oauth/",
]

export const isPublicRoute = (url: string): boolean => {
  // Exact match check
  if (PUBLIC_ROUTE_PATTERNS.includes(url)) {
    return true
  }

  // Pattern match check
  for (const pattern of PUBLIC_ROUTE_PATTERNS) {
    if (pattern.endsWith("/") && url.startsWith(pattern)) {
      return true
    }
  }

  // Workspace public endpoints (customize for your needs)
  // eslint-disable-next-line no-useless-escape
  if (url.match(/^\/api\/v1\/workspaces\/[^\/]+\/public\/?/)) {
    return true
  }

  return false
}
