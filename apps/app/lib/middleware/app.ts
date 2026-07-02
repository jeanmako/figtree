import { NextRequest, NextResponse } from "next/server"
import { OnboardingMiddleware } from "./onboarding"
import { appRedirect } from "./utils/app-redirect"
import { getMiddlewareSession } from "./utils/get-session"
import { getValidInternalRedirectPath } from "./utils/is-valid-internal-redirect"
import { parse } from "./utils/parse"
import {
  isAuthRoute,
  isOnboardingRoute,
  isPublicRoute,
  isSensitiveRoute,
} from "./utils/route-config"

export async function AppMiddleware(req: NextRequest): Promise<NextResponse> {
  const { pathname, searchParams, searchParamsString } = parse(req)

  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  const session = await getMiddlewareSession(req, {
    forceDb: isSensitiveRoute(pathname),
  })

  if (!session) {
    const safeNext =
      pathname !== "/"
        ? getValidInternalRedirectPath({
            redirectPath: pathname,
            currentUrl: req.url,
          })
        : null

    const loginUrl = new URL("/login", req.url)
    if (safeNext) loginUrl.searchParams.set("next", safeNext)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute(pathname)) {
    const next = searchParams.get("next")
    const validNext = next
      ? getValidInternalRedirectPath({
          redirectPath: next,
          currentUrl: req.url,
        })
      : null
    return NextResponse.redirect(new URL(validNext ?? "/onboarding", req.url))
  }

  if (!isOnboardingRoute(pathname)) {
    const onboardingRedirect = OnboardingMiddleware(req, pathname)
    if (onboardingRedirect) return onboardingRedirect
  }

  const redirectPath = await appRedirect(pathname)
  if (redirectPath) {
    return NextResponse.redirect(
      new URL(`${redirectPath}${searchParamsString}`, req.url)
    )
  }

  return NextResponse.next()
}
