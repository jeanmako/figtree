"use client";

import { OnboardingStep } from "../lib/types";
import { Button } from "@figtree/ui/components/button";
import { useOnboardingProgress } from "../hooks/use-onboarding-progress";
import { Spinner } from "@figtree/ui/components/spinner";

type Props = {
  step: OnboardingStep;
  text: string;
  size?: "default" | "lg" | "sm" | "xl" | "xs";
  variant?: "default" | "outline" | "secondary" | "link";
  className?: string;
};

export const NextButton = ({
  step,
  text = "Next",
  size = "default",
  variant = "default",
  className,
}: Props) => {
  const { continueTo, isLoading } = useOnboardingProgress();

  return (
    <Button
      size={size}
      variant={variant}
      onClick={() => continueTo(step)}
      disabled={isLoading}
      className={className}
    >
      {text}
      {isLoading && <Spinner />}
    </Button>
  );
};
