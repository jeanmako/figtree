import { NextRequest } from "next/server"

export type ParsedRequest = {
  pathname: string
  fullPath: string
  searchParams: URLSearchParams
  searchParamsString: string
}

export function parse(req: NextRequest): ParsedRequest {
  const { pathname, searchParams } = req.nextUrl
  const searchParamsString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : ""

  return {
    pathname,
    fullPath: `${pathname}${searchParamsString}`,
    searchParams,
    searchParamsString,
  }
}
