"use client"

import { authClient } from "@figtree/features/auth/auth-client"
import { useSearchParams } from "next/navigation"
import { Icons } from "@figtree/ui/components/icons"
import { AuthActionButton } from "@/components/auth/auth-action-button"
import {
  LastUsed,
  useLastLogin,
} from "@/modules/auth/login/hooks/use-last-login"
import { useLoginContext } from "@/modules/auth/login/components/login-context"
import { AuthMethods } from "@figtree/features/auth/types"
import { clientEnv } from "@figtree/shared/env/client"
export const LoginOAuth = ({
  methods,
  disabled,
}: {
  methods: AuthMethods[]
  disabled?: boolean
}) => {
  const searchParams = useSearchParams()
  const next = searchParams?.get("next")
  const appUrl = clientEnv.NEXT_PUBLIC_APP_URL
  const { setClickedMethod } = useLoginContext()
  const [lastUsed, setLastUsed] = useLastLogin()
  const callbackURL =
    next && next.length > 0 ? `${appUrl}${next}` : `${appUrl}/workspaces`

  return (
    <>
      {methods.includes("google") && (
        <AuthActionButton
          action={async () => {
            setClickedMethod("google")
            setLastUsed("google")
            await authClient.signIn.social({
              provider: "google",
              callbackURL,
            })
            return { error: null }
          }}
          disabled={disabled}
        >
          <Icons.google className="size-5!" />
          Continue with Google
          {lastUsed === "google" && <LastUsed />}
        </AuthActionButton>
      )}
      {methods.includes("github") && (
        <AuthActionButton
          action={async () => {
            setClickedMethod("github")
            setLastUsed("github")
            await authClient.signIn.social({
              provider: "github",
              callbackURL,
            })
            return { error: null }
          }}
          disabled={disabled}
        >
          <Icons.gitHub className="size-5!" />
          Continue with GitHub
          {lastUsed === "github" && <LastUsed />}
        </AuthActionButton>
      )}
    </>
  )
}
