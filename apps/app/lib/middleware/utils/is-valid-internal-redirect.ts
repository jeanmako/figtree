export function isValidInternalRedirect(
  redirectPath: string,
  currentUrl: string | URL
): boolean {
  try {
    // Block obvious protocol-relative attacks early
    if (redirectPath.startsWith("//")) return false

    const base = new URL(currentUrl)
    const redirectUrl = new URL(redirectPath, base)

    // Must be same-origin
    if (redirectUrl.origin !== base.origin) return false

    // Must be pathname-based only (no external protocol tricks)
    if (!redirectUrl.pathname.startsWith("/")) return false

    return true
  } catch {
    return false
  }
}

export function getValidInternalRedirectPath({
  redirectPath,
  currentUrl,
}: {
  redirectPath?: string | null
  currentUrl: string | URL
}): string | null {
  if (!redirectPath) {
    return null
  }
  const valid = isValidInternalRedirect(redirectPath, currentUrl)
  return valid ? redirectPath : null
}
