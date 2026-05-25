import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function getAuthCookieHint(req: NextRequest) {
  try {
    return await getSessionCookie(req, {
      cookiePrefix: "figtree",
    });
  } catch (error) {
    console.error("[getAuthCookieHint]", error);
    return undefined;
  }
}
