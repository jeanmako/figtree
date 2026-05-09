"use client"

import { type ReactElement } from "react"
import { useAppForm } from "@figtree/ui/hooks/form-hook"
import { Button } from "@figtree/ui/components/button"
import { signUpSchema, SignUpPayload } from "@figtree/shared/schemas/auth"
import { useSignupAndSendVerificationOtpMutation } from "@/modules/auth/sign-up/hooks/signup-and-verification-otp-send-mutation"
import { Spinner } from "@figtree/ui/components/spinner"

export const SignUpEmailForm = (): ReactElement => {
  const { mutateAsync: signupAndSendVerificationOtp, isPending: loading } =
    useSignupAndSendVerificationOtpMutation()
  const formId = "email-signup-form"

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } satisfies SignUpPayload as SignUpPayload,
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value: payload }) => {
      await signupAndSendVerificationOtp(payload)
    },
  })

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-2.5"
    >
      <form.AppField name="name">
        {(field) => (
          <field.Input
            size="lg"
            disabled={loading}
            placeholder="Enter your name..."
          />
        )}
      </form.AppField>
      <form.AppField name="email">
        {(field) => (
          <field.Input
            size="lg"
            disabled={loading}
            placeholder="Enter your email..."
          />
        )}
      </form.AppField>
      <form.AppField name="password">
        {(field) => (
          <field.Password
            size="lg"
            withChecker
            disabled={loading}
            placeholder="Enter your password..."
          />
        )}
      </form.AppField>

      <Button
        type="submit"
        variant="secondary"
        className="w-full"
        size="lg"
        disabled={loading}
        form={formId}
      >
        Continue
        {loading && <Spinner />}
      </Button>
    </form>
  )
}
