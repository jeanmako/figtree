"use client"

import { authClient } from "@figtree/features/auth/auth-client"
import { useSearchParams } from "next/navigation"
import { Icons } from "@figtree/ui/components/icons"
import { AuthActionButton } from "@/components/auth/auth-action-button"
import { AuthMethods } from "@figtree/shared/schemas/auth"
import { useEffect, useState } from "react"
import { Spinner } from "@figtree/ui/components/spinner"

export const SignUpOAuth = ({
  methods,
  disabled,
}: {
  methods: AuthMethods[]
  disabled?: boolean
}) => {
  const searchParams = useSearchParams()
  const next = searchParams?.get("next")
  const [clickedGoogle, setClickedGoogle] = useState(false)
  const [clickedGithub, setClickedGithub] = useState(false)

  useEffect(() => {
    // when leave page, reset state
    return () => {
      setClickedGoogle(false)
      setClickedGithub(false)
    }
  }, [])

  return (
    <>
      {methods.includes("google") && (
        <AuthActionButton
          action={async () => {
            setClickedGoogle(true)
            await authClient.signIn.social({
              provider: "google",
              ...(next && next.length > 0 ? { callbackURL: next } : {}),
            })
            return { error: null }
          }}
          disabled={disabled}
        >
          <Icons.google className="size-5!" />
          Continue with Google
          {clickedGoogle && <Spinner />}
        </AuthActionButton>
      )}
      {methods.includes("github") && (
        <AuthActionButton
          action={async () => {
            setClickedGithub(true)

            await authClient.signIn.social({
              provider: "github",
              ...(next && next.length > 0 ? { callbackURL: next } : {}),
            })
            return { error: null }
          }}
          disabled={disabled}
        >
          <Icons.gitHub className="size-5!" />
          Continue with GitHub
          {clickedGithub && <Spinner />}
        </AuthActionButton>
      )}
    </>
  )
}
