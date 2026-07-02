"use client"

import { Button } from "@figtree/ui/components/button"
import { Monochromes } from "@figtree/ui/components/monochromes"
import React from "react"
import { useServiceParams } from "@/modules/services/hooks/use-service-params"
import { CreateServiceModal } from "../ui/create-service-modal"

export const EmptyState = () => {
  const { setParams } = useServiceParams()

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex w-full max-w-sm flex-initial flex-col items-center gap-y-6">
        <div className="flex justify-start">
          <Monochromes.briefcase className="size-24 shrink-0" />
        </div>
        <div className="flex flex-initial flex-col items-center gap-y-6">
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-left text-sm leading-6 font-semibold">
              Build your service catalog
            </span>
            <p className="text-center text-tiny font-medium tracking-snug text-duper">
              Package your expertise into clear, repeatable offerings. Every
              service becomes a reusable foundation for proposals, contracts,
              projects, and client onboarding.
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <Button
              size="sm"
              onClick={() => setParams({ createService: true })}
            >
              Create service
            </Button>
          </div>
        </div>
      </div>
      <CreateServiceModal />
    </div>
  )
}

export default EmptyState
