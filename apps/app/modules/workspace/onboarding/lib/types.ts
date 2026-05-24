export const ONBOARDING_STEPS = [
  "workspace",
  "invite",
  "business",
  "plan",
  "completed",
] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]
