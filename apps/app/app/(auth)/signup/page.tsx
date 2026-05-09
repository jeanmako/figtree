import { SignUpPageClient } from "@/modules/auth/sign-up/page-client"
import React from "react"

type Props = {}

const SignUpPage = (props: Props) => {
  return (
    <div className="flex w-full flex-1 flex-col justify-center">
      <SignUpPageClient />
    </div>
  )
}

export default SignUpPage
