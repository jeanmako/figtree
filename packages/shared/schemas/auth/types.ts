import z from "zod"
import {
  loginSchema,
  signUpSchema,
  extendedSignUpWithTotpSchema,
  otpVerificationSchema,
} from "./schema"

export type LoginPayload = z.infer<typeof loginSchema>
export type SignUpPayload = z.infer<typeof signUpSchema>
export type OTPVerificationPayload = z.infer<typeof otpVerificationSchema>
export type ExtendedSignUpWithTotpPayload = z.infer<
  typeof extendedSignUpWithTotpSchema
>

export type AuthMethods = (typeof authMethods)[number]

export const authMethods = [
  "google",
  "github",
  "email",
  "saml",
  "credentials",
] as const
