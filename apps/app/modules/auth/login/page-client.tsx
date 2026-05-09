"use client"

import { LoginEmailForm } from "@/modules/auth/login/components/login-email-form"
import { Header } from "@figtree/ui/components/shared/section-layout"
import { HrSeparator } from "@figtree/ui/components/hr-separator"
import Link from "next/link"

import { LoginOAuth } from "@/modules/auth/login/components/login-oauth"
import { AuthMethods, authMethods } from "@figtree/features/auth/types"
import { useLoginContext } from "./components/login-context"

export function LoginPageClient({
  methods = [...authMethods],
  next,
}: Readonly<{
  methods?: AuthMethods[]
  next?: string
}>) {
  const { formValues } = useLoginContext()
  return (
    <div className="flex w-full flex-col">
      <Header
        title="Sign in to Figtree"
        description="Welcome back! Please sign in to continue"
        className="mx-auto mb-6 w-full max-w-md md:max-w-xl"
      />
      <div className="mx-auto flex w-full max-w-sm flex-col">
        <div className="mx-auto w-[90%]">
          <div className="flex flex-col gap-y-3">
            <LoginOAuth methods={methods} />
          </div>
          <HrSeparator />
          <LoginEmailForm />
          <div className="mt-6 flex flex-col items-center gap-y-2">
            <Link
              href={`/forgot-password?email=${encodeURIComponent(formValues.email)}`}
              className="text-sm font-medium text-quiet hover:underline"
            >
              Forgot Password?
            </Link>
            <p className="text-center text-sm font-medium text-quiet">
              Don&apos;t have an account?&nbsp;
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
