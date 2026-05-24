import { OnboardingWelcomeView } from "@/modules/workspace/onboarding/components/welcome/onboarding-welcome-view";

type Props = {};

const OnboardingWelcomePage = (props: Props) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center max-w-md mx-auto">
      <OnboardingWelcomeView />
    </div>
  );
};

export default OnboardingWelcomePage;
