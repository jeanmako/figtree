/**
 * Lifecycle:
 *   Sign-in             → query Redis once   → setUserHintCookieOnStore()
 *   Step advances       → write Redis         → setUserHintCookieOnStore()   (server action)
 *   Middleware read     → getUserHintFromRequest()                            (NextRequest)
 *   Sign-out            → clearUserHintCookieOnStore()
 */
import type { cookies } from "next/headers"
import { type NextRequest, type NextResponse } from "next/server"
import { type OnboardingStep } from "@/modules/workspace/onboarding/lib/types"
import { serverEnv } from "@figtree/shared/env/server"

export type UserHint = {
  onboardingStep: OnboardingStep | "completed"
}

// Constants

const COOKIE_NAME = "figtree.user-hint"
const IS_PROD = serverEnv.NODE_ENV === "production"

/** Match the Better Auth session lifetime so they always expire together. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

const COOKIE_OPTIONS = {
  httpOnly: false,
  secure: IS_PROD,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
}

function encode(hint: UserHint): string {
  return Buffer.from(JSON.stringify(hint)).toString("base64")
}

function decode(raw: string): UserHint | null {
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf-8")) as UserHint
  } catch {
    return null
  }
}

/** Read the hint cookie from an incoming middleware request. */
export function getUserHintFromRequest(req: NextRequest): UserHint | null {
  const raw = req.cookies.get(COOKIE_NAME)?.value
  if (!raw) return null
  return decode(raw)
}

/** Write the hint cookie onto a middleware NextResponse. */
export function setUserHintCookie(res: NextResponse, hint: UserHint): void {
  res.cookies.set(COOKIE_NAME, encode(hint), COOKIE_OPTIONS)
}

/** Delete the hint cookie from a middleware NextResponse. */
export function clearUserHintCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 })
}

// Server actions cannot access NextRequest/NextResponse directly, but they
// can read and write cookies via the next/headers store — which is what
// Next.js uses to set Set-Cookie headers on the action response.

type CookieStore = Awaited<ReturnType<typeof cookies>>

export function getUserHintFromCookieStore(
  store: CookieStore
): UserHint | null {
  const raw = store.get(COOKIE_NAME)?.value
  if (!raw) return null
  return decode(raw)
}

/** Write the hint cookie via the next/headers cookie store.
 *  Call this in server actions after writing to Redis. */
export function setUserHintCookieOnStore(
  store: CookieStore,
  hint: UserHint
): void {
  store.set(COOKIE_NAME, encode(hint), COOKIE_OPTIONS)
}

/** Delete the hint cookie via the next/headers cookie store.
 *  Call this in your sign-out server action. */
export function clearUserHintCookieOnStore(store: CookieStore): void {
  store.set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 })
}
