import { useMutation } from "@tanstack/react-query"
import { signUp, emailOtp } from "@figtree/features/auth/auth-client"
import { SignUpPayload } from "@figtree/shared/schemas/auth"
import { toastManager } from "@figtree/ui/components/toast"
import { useSignUpContext } from "@/modules/auth/sign-up/components/sign-up-context"

export const useSignupAndSendVerificationOtpMutation = () => {
  const { setFormValues, setStep } = useSignUpContext()

  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      await signUp.email({
        ...payload,
        callbackURL: "/",
      })

      await emailOtp.sendVerificationOtp({
        email: payload.email,
        type: "email-verification",
      })

      return payload
    },

    onSuccess(payload) {
      setFormValues((prev) => ({
        ...prev,
        ...payload,
      }))

      setStep("verify")

      toastManager.add({
        title: "Check your email!",
        description: `A verification email has been sent to ${payload.email}.`,
        type: "success",
      })
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toastManager.add({
        title: error?.error?.message || "Failed to sign up",
        type: "error",
      })
    },
  })
}
