"use server"

import { cookies } from "next/headers"
import { z } from "zod"
import { onboardingStepService } from "@/modules/workspace/onboarding/lib/onboarding-step"
import { ONBOARDING_STEPS } from "@/modules/workspace/onboarding/lib/types"
import { authUserActionClient } from "@/lib/safe-action"
import {
  getUserHintFromCookieStore,
  setUserHintCookieOnStore,
} from "@/lib/middleware/utils/user-hint-cookie"

export const setOnboardingProgress = authUserActionClient
  .inputSchema(
    z.object({
      onboardingStep: z.enum(ONBOARDING_STEPS).nullable(),
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    const { onboardingStep } = parsedInput

    if (!onboardingStep) {
      throw new Error("onboardingStep is required")
    }

    try {
      // 1. Write to Redis — source of truth
      await onboardingStepService.set({
        userId: ctx.user.id,
        step: onboardingStep,
      })

      // 2. Sync the hint cookie so middleware immediately sees the new step
      //    without a Redis call. Happens after the Redis write succeeds —
      //    we never want the cookie ahead of the source of truth.
      const store = await cookies()
      const existing = getUserHintFromCookieStore(store)

      setUserHintCookieOnStore(store, {
        ...existing,
        onboardingStep,
      })
    } catch (e) {
      console.error("Failed to update onboarding step", e)
      throw new Error("Failed to update onboarding step")
    }

    return { success: true }
  })
