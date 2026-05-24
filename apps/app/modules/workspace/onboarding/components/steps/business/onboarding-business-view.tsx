import { StepPage } from "../step-page"
import { BusinessOnboardingStep } from "./form"

export const OnboardingBusinessView = async () => {
  return (
    <StepPage
      title="Tell us about your business"
      description="Help us tailor Figtree to your specific business needs."
    >
      <BusinessOnboardingStep />
    </StepPage>
  )
}
