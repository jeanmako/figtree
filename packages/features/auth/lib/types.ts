import { auth } from "./auth"

export type Session = typeof auth.$Infer.Session.session
export type User = typeof auth.$Infer.Session.user

export type MiddlewareSession = {
  user: {
    id: string
    email: string
    name: string
    createdAt: Date
    emailVerified: boolean
  }
  session: {
    id: string
    expiresAt: Date
  }
} | null

export type AuthMethods = (typeof authMethods)[number]

export const authMethods = [
  "google",
  "github",
  "email",
  "saml",
  "credentials",
] as const
