import {
  ONBOARDING_WINDOW_SECONDS,
  onboardingStepService,
} from "@/modules/workspace/onboarding/lib/onboarding-step";
import { NextRequest, NextResponse } from "next/server";
import { type User } from "@figtree/features/auth/auth";

function isPublicRoute(path: string) {
  return (
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path.startsWith("/auth/reset-password")
  );
}

function redirectToLogin(req: NextRequest, fullPath: string) {
  return NextResponse.redirect(
    new URL(
      `/login${fullPath !== "/" ? `?next=${encodeURIComponent(fullPath)}` : ""}`,
      req.url,
    ),
  );
}

/* Onboarding redirects
  - User was created less than a day ago
  - The path does not start with /onboarding
  - User has not completed the onboarding flow
*/

async function handleOnboarding(user: User, path: string, req: NextRequest) {
  const isNewUser =
    new Date(user.createdAt).getTime() >
    Date.now() - ONBOARDING_WINDOW_SECONDS * 1000;

  const onboardingStep = await onboardingStepService.get({ userId: user.id });

  if (
    isNewUser &&
    !path.startsWith("/onboarding") &&
    onboardingStep !== "completed"
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return null;
}

export { handleOnboarding, redirectToLogin, isPublicRoute };
