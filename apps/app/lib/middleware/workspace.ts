import { NextRequest, NextResponse } from "next/server"
import { getRequestInfo } from "@/lib/middleware/utils/request"
import { getAuthCookieHint } from "@/lib/middleware/utils/get-cookie-hint"
import { appRedirect } from "@/lib/middleware/utils/app-redirect"
import { isPublicRoute, redirectToLogin } from "@/lib/middleware/utils/helper"

export default async function WorkspaceMiddleware(req: NextRequest) {
  const { pathname, fullPath, searchParams } = getRequestInfo(req)

  const userCookie = await getAuthCookieHint(req)

  if (!userCookie && !isPublicRoute(pathname)) {
    return redirectToLogin(req, fullPath)
  }

  if (userCookie) {
    // const onboardingRedirect = handleOnboarding(userCookie, pathname, req)
    // if (onboardingRedirect) return onboardingRedirect

    const redirectPath = await appRedirect(pathname)
    if (redirectPath) {
      return NextResponse.redirect(
        new URL(`${redirectPath}${searchParams}`, req.url)
      )
    }

    // 🔐 prevent login/signup access when logged in
    if (["/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }
  }

  return NextResponse.next()
}
