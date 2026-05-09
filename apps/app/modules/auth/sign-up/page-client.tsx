"use client"

import { truncate } from "@figtree/utils/functions/truncate"
import {
  SignUpProvider,
  useSignUpContext,
} from "@/modules/auth/sign-up/components/sign-up-context"
import Link from "next/link"
import { SignUpEmailForm } from "@/modules/auth/sign-up/components/signup-email-form"
import { Header } from "@figtree/ui/components/shared/section-layout"
import { HrSeparator } from "@figtree/ui/components/hr-separator"
import { SignUpOAuth } from "@/modules/auth/sign-up/components/signup-oauth"
import { VerifyEmailForm } from "./components/verify-email-form"

export function SignUpPageClient() {
  return (
    <SignUpProvider
      initialValues={{ email: "jeanmako117@proton.me", name: "", password: "" }}
    >
      <SignUpFlow />
    </SignUpProvider>
  )
}

type SignUpProps = {
  methods?: ("email" | "google" | "github")[]
}

function SignUp({ methods = ["email", "google", "github"] }: SignUpProps) {
  return (
    <div className="flex w-full flex-col">
      <Header
        title="Sign up to manage your work and understand your business."
        description="By continuing, you agree to our Privacy policy."
        className="mx-auto mb-6 w-full max-w-md md:max-w-xl"
      />
      <div className="mx-auto flex w-full max-w-sm flex-col">
        <div className="mx-auto w-[90%]">
          <div className="flex flex-col gap-y-2">
            <SignUpOAuth methods={methods} />
          </div>
          <HrSeparator />
          <SignUpEmailForm />
          <p className="mt-3 text-center text-sm font-medium text-quiet">
            Already have an account?&nbsp;
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Verify() {
  const { formValues } = useSignUpContext()
  const { email } = formValues

  return (
    <>
      <div className="flex w-full flex-col">
        <Header
          title="Verify your email address to get started"
          description={
            <p className="text-center text-base font-medium tracking-snug text-quiet">
              Enter the 6-digit code we sent to{" "}
              <strong
                className="font-semibold text-accent-foreground"
                title={email}
              >
                {truncate(email, 30)}
              </strong>
            </p>
          }
          className="mx-auto mb-6 w-full max-w-md md:max-w-lg"
        />
        <div className="mx-auto mt-4 flex w-full max-w-sm flex-col">
          <div className="mx-auto flex w-[90%] justify-center">
            <VerifyEmailForm />
          </div>
        </div>
      </div>
    </>
  )
}

const SignUpFlow = () => {
  const { step } = useSignUpContext()

  if (step === "signup") return <SignUp />
  if (step === "verify") return <Verify />
}
