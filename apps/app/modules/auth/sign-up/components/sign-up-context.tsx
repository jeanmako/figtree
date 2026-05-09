"use client"

import { SignUpPayload } from "@figtree/shared/schemas/auth"

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"

interface SignUpContextType {
  step: "signup" | "verify"
  setStep: (step: "signup" | "verify") => void
  formValues: SignUpPayload
  setFormValues: (
    values: SignUpPayload | ((prev: SignUpPayload) => SignUpPayload)
  ) => void
  lockEmail?: boolean
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined)

export const SignUpProvider: React.FC<
  PropsWithChildren<{ lockEmail?: boolean; initialValues: SignUpPayload }>
> = ({ lockEmail, children, initialValues }) => {
  const [step, setStep] = useState<"signup" | "verify">("signup")
  const [formValues, setFormValues] = useState<SignUpPayload>(initialValues)

  const value = useMemo(
    () => ({
      step,
      formValues,
      setFormValues,
      setStep,
      lockEmail,
    }),
    [step, formValues, lockEmail]
  )

  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  )
}

export const useSignUpContext = () => {
  const context = useContext(SignUpContext)

  if (context === undefined) {
    throw new Error("useSignUpContext must be used within a SignUpProvider")
  }

  return context
}
