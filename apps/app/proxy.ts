/**
 * proxy.ts in Next.js 16+ runs Node.js as the default.
 * No more runtime: "nodejs", throws an error https://nextjs.org/docs/app/api-reference/file-conventions/proxy#runtime
 */

import { NextRequest, NextResponse } from "next/server"
import { AppMiddleware } from "./lib/middleware/app"

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /_next/        Next.js internals
     * 2. /api/auth/     Better Auth routes (handled by the route handler, not middleware)
     * 3. Static files   (images, fonts, icons, etc.)
     * 4. Metadata files
     *
     * Note: /api/trpc and other API routes DO pass through so we can
     * add auth headers or logging if needed.
     */
    "/((?!_next/|api/auth/|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}

export default async function proxy(req: NextRequest): Promise<NextResponse> {
  return AppMiddleware(req)
}
