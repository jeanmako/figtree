"use client"

import { useState, useEffect } from "react"
import { localStorage } from "@figtree/lib/local-storage"
import { cn } from "@figtree/ui/lib/utils"
import { AuthMethods } from "@figtree/features/auth/types"

export function useLastLogin() {
  const [lastUsed, setLastUsed] = useState<AuthMethods>()

  useEffect(() => {
    const storedValue = localStorage.getItem("last_figtree_login_method")
    if (storedValue) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastUsed(storedValue as AuthMethods)
    }
  }, [])

  useEffect(() => {
    if (lastUsed) {
      localStorage.setItem("last_figtree_login_method", lastUsed)
    } else {
      localStorage.removeItem("last_figtree_login_method")
    }
  }, [lastUsed])

  return [lastUsed, setLastUsed] as const
}

export const LastUsed = ({ className }: { className?: string }) => {
  // const { t } = useLocale(); // TODO: Add localization
  return (
    <div className="absolute -top-1/2 -right-2 flex h-max translate-y-1/2 items-center justify-center rounded-sm border bg-background px-1.5">
      <span className={cn("text-[11px] text-quiet", className)}>Last used</span>
    </div>
  )
}
