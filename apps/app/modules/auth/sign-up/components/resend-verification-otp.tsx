"use client"

import { Spinner } from "@figtree/ui/components/spinner"
import { cn } from "@figtree/ui/lib/utils"
import { useEffect, useState } from "react"
import { useResendVerificationOtpMutation } from "../hooks/verification-otp-resend-mutation"
import { Button } from "@figtree/ui/components/button"

export const ResendVerificationOtp = ({ email }: { email: string }) => {
  const [delaySeconds, setDelaySeconds] = useState(0)
  const [state, setState] = useState<"default" | "success" | "error">("default")

  const mutation = useResendVerificationOtpMutation({ email })

  const isPending = mutation.isPending

  const executeResend = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        setState("success")
        setDelaySeconds(60)
      },
      onError: () => {
        setState("error")
        setDelaySeconds(5)
      },
    })
  }

  useEffect(() => {
    if (delaySeconds > 0) {
      const interval = setInterval(
        () => setDelaySeconds(delaySeconds - 1),
        1000
      )

      return () => clearInterval(interval)
    }
  }, [delaySeconds])

  useEffect(() => {
    if (delaySeconds === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("default")
    }
  }, [delaySeconds])

  return (
    <div className="relative mt-4 text-center text-sm font-medium text-quiet">
      {state === "default" && (
        <>
          {isPending && (
            <div className="absolute top-1/2 left-4 -translate-y-1/2 pr-1.5">
              <Spinner className="size-4" />
            </div>
          )}

          <p className={cn(isPending && "opacity-80")}>
            Didn&apos;t receive a code?{" "}
            <Button
              variant="link"
              size="sm"
              onClick={() => executeResend()}
              className={cn(
                "font-semibold text-quiet transition-colors hover:text-accent-foreground",
                isPending && "pointer-events-none"
              )}
            >
              Resend
            </Button>
          </p>
        </>
      )}

      {state === "success" && (
        <p className="text-sm text-neutral-500">
          Code sent successfully. <Delay seconds={delaySeconds} />
        </p>
      )}

      {state === "error" && (
        <p className="text-sm text-neutral-500">
          Failed to send code. <Delay seconds={delaySeconds} />
        </p>
      )}
    </div>
  )
}

const Delay = ({ seconds }: { seconds: number }) => {
  return (
    <span className="ml-1 text-sm text-neutral-400 tabular-nums">
      {seconds}s
    </span>
  )
}
