import z from "zod"

export const passwordSchema = z
  .string()
  .nonempty({ message: "Password is required" })
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password cannot exceed 72 characters.")
  .refine(
    (password) => password.length >= 8,
    "Password must be at least 8 characters"
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    "Password must contain at least 1 uppercase character"
  )
  .refine(
    (password) => /[a-z]/.test(password),
    "Password must contain at least 1 lowercase character"
  )
  .refine(
    (password) => /[0-9]/.test(password),
    "Password must contain at least 1 number"
  )
  .refine(
    (password) => /[!@#$%^&*()_+\-=\[\]{};`':"\\|,.<>\/?]/.test(password),
    "Password must contain at least 1 symbol"
  )

export const passwordSchemaWithoutRefine = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password cannot exceed 72 characters")

export const emailSchema = z
  .email({ message: "Please enter a valid email address" })
  .nonempty({ message: "Email is required" })
  .transform((email) => email.toLowerCase())

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),
})

export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "The OTP code should be 6 characters long." }),
})

export const extendedSignUpWithTotpSchema = signUpSchema.extend({
  totp: z.string().length(6, {
    message: "The TOTP code should be 6 characters long.",
  }),
})

export const requestPasswordResetSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  })

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: passwordSchema,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  })

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchemaWithoutRefine.optional(), // Allow password to be optional for cases where user has 2FA enabled and needs to provide TOTP code instead.
})
