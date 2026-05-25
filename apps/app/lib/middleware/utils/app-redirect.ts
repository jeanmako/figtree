const APP_REDIRECTS = {
  "/account": "/account/settings",
  "/onboarding": "/onboarding/workspace",
  "/welcome": "/onboarding/welcome",
} as const

export const appRedirect = async (path: string) => {
  if (path in APP_REDIRECTS) {
    return APP_REDIRECTS[path as keyof typeof APP_REDIRECTS]
  }

  return null
}
