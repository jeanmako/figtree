"use client"

import { type ReactElement } from "react"
import { useAppForm } from "@figtree/ui/hooks/form-hook"
import { Button } from "@figtree/ui/components/button"
import { useSignUpContext } from "@/modules/auth/sign-up/components/sign-up-context"
import { toastManager } from "@figtree/ui/components/toast"
import {
  otpVerificationSchema,
  OTPVerificationPayload,
} from "@figtree/shared/schemas/auth"
import { emailOtp } from "@figtree/features/auth/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import { getValidInternalRedirectPath } from "@/lib/middleware/utils/is-valid-internal-redirect"
import { ResendVerificationOtp } from "./resend-verification-otp"

export const VerifyEmailForm = (): ReactElement => {
  const { formValues } = useSignUpContext()
  const searchParams = useSearchParams()
  const router = useRouter()
  const formId = "email-signup-form"

  const form = useAppForm({
    defaultValues: {
      otp: "",
    } satisfies OTPVerificationPayload as OTPVerificationPayload,
    validators: {
      onSubmit: otpVerificationSchema,
    },
    onSubmit: async ({ value: payload }) => {
      await emailOtp.verifyEmail(
        {
          email: formValues.email,
          otp: payload.otp,
        },
        {
          onSuccess() {
            toastManager.add({
              title: "Your email has been verified!",
              type: "success",
            })
            // setIsRedirecting(true)

            // preserve the next query param if present (and valid)
            const next = getValidInternalRedirectPath({
              redirectPath: searchParams.get("next"),
              currentUrl: window.location.href,
            })

            router.push(
              `/onboarding${next ? `?next=${encodeURIComponent(next)}` : ""}`
            )
          },
          onError({ error }) {
            toastManager.add({
              title: error.message || "Invalid OTP",
              type: "error",
            })
            form.setFieldValue("otp", "")
          },
        }
      )
    },
  })

  return (
    <div>
      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <form.AppField name="otp">{(field) => <field.OTP />}</form.AppField>
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          size="lg"
          form={formId}
        >
          Continue
        </Button>
      </form>
      <ResendVerificationOtp email={formValues.email} />
    </div>
  )
}
