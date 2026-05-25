import { NextRequest } from "next/server";

export function getRequestInfo(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  return {
    pathname,
    searchParams,
    fullPath: `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`,
  };
}
