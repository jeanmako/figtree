"use client"

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { useLastLogin } from "@/modules/auth/login/hooks/use-last-login"
import { useSearchParams } from "next/navigation"
import { toastManager } from "@figtree/ui/components/toast"
import { authErrorMap } from "@figtree/features/auth/error-codes"
import {
  AuthMethods as AuthMethod,
  authMethods,
} from "@figtree/features/auth/types"
import { LoginPayload } from "@figtree/shared/schemas/auth"

type Step = "credentials" | "2fa"

interface LoginContextType {
  step: Step
  setStep: (step: Step) => void
  formValues: LoginPayload
  setFormValues: (
    values: LoginPayload | ((prev: LoginPayload) => LoginPayload)
  ) => void
  authMethod?: AuthMethod
  setAuthMethod: (method?: AuthMethod) => void
  clickedMethod?: AuthMethod
  setClickedMethod: (method?: AuthMethod) => void
  setLastUsed: (method?: AuthMethod) => void
}

const LoginContext = createContext<LoginContextType | undefined>(undefined)

export const LoginProvider: React.FC<
  PropsWithChildren<{ initialValues: LoginPayload }>
> = ({ children, initialValues }) => {
  const searchParams = useSearchParams()

  const [step, setStep] = useState<Step>("credentials")
  const [formValues, setFormValues] = useState(initialValues)
  const [lastUsed, setLastUsed] = useLastLogin()

  const [clickedMethod, setClickedMethod] = useState<AuthMethod>()
  const [authMethod, setAuthMethod] = useState<AuthMethod | undefined>(
    authMethods.find((m) => m === lastUsed) ?? "email"
  )

  // error handling
  useEffect(() => {
    const error = searchParams?.get("error")

    if (!error) return

    if (error in authErrorMap) {
      const parsed = authErrorMap[error as keyof typeof authErrorMap]

      if (parsed.display === "toast") {
        toastManager.add({ title: parsed.message })
      }
    }
  }, [searchParams])

  // cleanup
  useEffect(() => {
    return () => setClickedMethod(undefined)
  }, [])

  return (
    <LoginContext.Provider
      value={{
        step,
        setStep,
        formValues,
        setFormValues,
        authMethod,
        setAuthMethod,
        clickedMethod,
        setClickedMethod,
        setLastUsed,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => {
  const ctx = useContext(LoginContext)
  if (!ctx) throw new Error("useLoginContext must be used within provider")
  return ctx
}
