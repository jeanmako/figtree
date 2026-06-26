/**
 * Resolves the verified Better Auth session inside middleware.
 *
 * Because proxy.ts (Next.js 16) with `runtime: "nodejs"`
 * runs in the Node.js runtime, we have two options in order of preference:
 *
 *   1. getCookieCache  — reads the signed session cache cookie. Zero DB call.
 *      Valid for up to `cookieCache.maxAge` (5 min in our config). Best for
 *      the vast majority of requests.
 *
 *   2. auth.api.getSession — full DB verification. Use for sensitive paths
 *      (password change, billing, 2FA setup) by passing `forceDb: true`.
 *
 */

import { auth } from "@figtree/features/auth/auth"
import { MiddlewareSession } from "@figtree/features/auth/types"
import { getCookieCache } from "better-auth/cookies"
import { type NextRequest } from "next/server"

/**
 * @param forceDb - bypass cookie cache and hit the DB. Use for sensitive paths.
 */
export async function getMiddlewareSession(
  req: NextRequest,
  { forceDb = false }: { forceDb?: boolean } = {}
): Promise<MiddlewareSession> {
  try {
    if (!forceDb) {
      // Fast path: read from signed cookie cache — no DB call
      const cached = await getCookieCache(req)
      if (cached) return cached as MiddlewareSession
    }

    // Slow path: full DB verification
    const result = await auth.api.getSession({
      headers: req.headers,
      query: { disableCookieCache: true },
    })

    return result as MiddlewareSession
  } catch {
    // A malformed/expired cookie should fail closed — treat as unauthenticated
    return null
  }
}
