import { auth } from "./auth"

export type Session = typeof auth.$Infer.Session.session
export type User = typeof auth.$Infer.Session.user

export type AuthMethods = (typeof authMethods)[number]

export const authMethods = [
  "google",
  "github",
  "email",
  "saml",
  "credentials",
] as const
