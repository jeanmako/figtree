"use client"

import { RemasteredModal } from "@figtree/ui/components/remastered-modal"
import { useServiceParams } from "@/modules/services/hooks/use-service-params"
import { Icons } from "@figtree/ui/components/icons"
import ServiceCreateForm from "../forms/service-create-form"

export const CreateServiceModal = () => {
  const { setParams, createService } = useServiceParams()

  const isOpen = Boolean(createService)

  return (
    <RemasteredModal
      title="Create service"
      icon={<Icons.briefcase />}
      actionLabel="Create service"
      actionFormId={"service-create-form"}
      //   triggerContent={
      //     <>
      //       <Icons.plus />
      //       New Service
      //     </>
      //   }
      open={isOpen}
      onOpenChange={() => setParams(null)}
      className="w-150"
    >
      <ServiceCreateForm />
    </RemasteredModal>
  )
}
