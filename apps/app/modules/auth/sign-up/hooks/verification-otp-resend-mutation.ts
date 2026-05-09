import { useMutation } from "@tanstack/react-query"
import { authClient } from "@figtree/features/auth/auth-client"

export const useResendVerificationOtpMutation = ({
  email,
}: {
  email: string
}) => {
  return useMutation({
    mutationFn: async () =>
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "email-verification",
      }),
  })
}
