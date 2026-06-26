/**
 * Handles onboarding redirect logic for authenticated users.
 *
 * Source of truth for onboarding step: Upstash Redis (via onboardingStepService).
 * How middleware reads it: the figtree.user-hint cookie — a short-lived cache
 * of the Redis value, written at sign-in and updated after each step completes.
 * Data flow:
 *   Sign-in          → onboardingStepService.get() → setUserHintCookie()
 *   Step advances    → onboardingStepService.set() → updateOnboardingStepCookie()
 *   Every request    → getUserHintFromRequest()     → zero I/O
 */

import { NextRequest, NextResponse } from "next/server"
import { type OnboardingStep } from "@/modules/workspace/onboarding/lib/types"
import { ONBOARDING_PREFIX } from "./utils/route-config"
import { getUserHintFromRequest } from "./utils/user-hint-cookie"

const STEP_TO_PATH: Record<OnboardingStep, string> = {
  workspace: "workspace",
  business: "business",
  invite: "invite",
  plan: "plan",
  completed: "completed",
}

function onboardingStepToPath(step: OnboardingStep): string {
  return `${ONBOARDING_PREFIX}/${STEP_TO_PATH[step] ?? step}`
}

export function OnboardingMiddleware(
  req: NextRequest,
  pathname: string
): NextResponse | null {
  if (pathname.startsWith(ONBOARDING_PREFIX)) return null

  // Read the hint cookie.
  // Set server-side at sign-in (querying Redis once), updated after each step.
  const hint = getUserHintFromRequest(req)
  if (!hint) return null

  // Completed — nothing to do
  if (hint.onboardingStep === "completed") return null

  // Redirect to the exact step the user left off on.

  const stepPath = onboardingStepToPath(hint.onboardingStep)
  return NextResponse.redirect(new URL(stepPath, req.url))
}
