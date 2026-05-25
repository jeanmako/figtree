import { useMutation } from "@tanstack/react-query"
import { emailOtp } from "@figtree/features/auth/auth-client"

export const useResendVerificationOtpMutation = ({
  email,
}: {
  email: string
}) => {
  return useMutation({
    mutationFn: async () =>
      await emailOtp.sendVerificationOtp({
        email: email,
        type: "email-verification",
      }),
  })
}
