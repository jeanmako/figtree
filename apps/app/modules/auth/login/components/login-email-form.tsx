"use client"

import { Button } from "@figtree/ui/components/button"
import { useRouter, useSearchParams } from "next/navigation"
import { loginSchema, LoginPayload } from "@figtree/shared/schemas/auth"
import { useLoginContext } from "@/modules/auth/login/components/login-context"
import { signIn } from "@figtree/features/auth/auth-client"
import { toastManager } from "@figtree/ui/components/toast"
import { useAppForm } from "@figtree/ui/hooks/form-hook"

/* TODO: handle cases where password is not required by adding checks to see if the user has a password set and conditionally 
rendering the password field and adjusting the submit logic accordingly. 
This will likely involve adding a state to the login flow where we first check if the user exists and has a password 
before rendering the appropriate form fields.
*/

export const LoginEmailForm = () => {
  const { clickedMethod } = useLoginContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const formId = "user-login-form"
  const callbackUrl = searchParams?.get("callbackUrl")

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginPayload as LoginPayload,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value: payload }) => {
      await signIn.email(
        {
          email: payload.email,
          password: payload.password as string,
          callbackURL: callbackUrl || "/workspaces",
        },

        {
          onError: (error) => {
            if (error.error.code === "EMAIL_NOT_VERIFIED") {
              toastManager.add({
                title: "Email not verified",
                description: "Please verify your email before signing in.",
                type: "error",
              })
            }
            toastManager.add({
              title: error.error.message || "Failed to sign in",
            })
          },
          onSuccess: () => {
            router.push("/onboarding")
          },
        }
      )
    },
  })

  const password = form.getFieldValue("password")

  return (
    <div>
      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
        autoFocus={false}
      >
        <form.AppField name="email">
          {(field) => (
            <field.Input
              id={`${formId}-${field.name}`}
              size="lg"
              placeholder="Enter your email..."
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.Password
              id={`${formId}-${field.name}`}
              size="lg"
              placeholder="Enter your password..."
            />
          )}
        </form.AppField>
        <Button
          type="submit"
          size={"lg"}
          className="w-full"
          disabled={clickedMethod && clickedMethod !== "email"}
        >
          {`Continue with ${password ? "password" : "email"}`}
        </Button>
      </form>
    </div>
  )
}
