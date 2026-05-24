"use client"

import { useOnboardingProgress } from "@/modules/workspace/onboarding/hooks/use-onboarding-progress"
import { StepPage } from "@/modules/workspace/onboarding/components/steps/step-page"
import { OnboardingWorkspaceForm } from "./form"

export const OnboardingWorkspaceView = () => {
  const { continueTo } = useOnboardingProgress()
  return (
    <StepPage
      title="Let's set up your workspace"
      description="A home for your team to manage projects."
    >
      <OnboardingWorkspaceForm
        onSuccess={({ slug }) => {
          continueTo("business", { slug })
        }}
      />
    </StepPage>
  )
}
