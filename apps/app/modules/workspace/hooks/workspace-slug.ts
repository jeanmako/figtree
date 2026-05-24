"use client"

import { useParams, usePathname, useSearchParams } from "next/navigation"

const RESERVED_PATHS = new Set([
  "api",
  "auth",
  "settings",
  "onboarding",
  "public",
])

function isValidSlug(value: unknown): value is string {
  return (
    typeof value === "string" && value.length > 0 && !RESERVED_PATHS.has(value)
  )
}

export function useWorkspaceSlug(): string | null {
  const params = useParams()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Preferred source: dynamic route param
  if (isValidSlug(params.slug)) {
    return params.slug
  }

  // Secondary source: query params
  const searchSlug = searchParams.get("workspace") ?? searchParams.get("slug")

  if (isValidSlug(searchSlug)) {
    return searchSlug
  }

  // Final fallback: pathname parsing
  const firstSegment = pathname.split("/").filter(Boolean)[0]

  if (isValidSlug(firstSegment)) {
    return firstSegment
  }

  return null
}
