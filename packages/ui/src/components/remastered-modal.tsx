import React from "react"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@figtree/ui/components/dialog"

import { Icons } from "@figtree/ui/components/icons"
import { Button } from "@figtree/ui/components/button"
import { cn } from "@figtree/ui/lib/utils"
import { toastManager } from "./toast.js"

type Props = {
  icon: React.ReactNode
  title: string
  triggerContent: React.ReactNode
  actionLabel: string
  actionFormId?: string
  action?: () => Promise<{ error: boolean; message?: string }>
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

export const RemasteredModal = ({
  icon,
  title,
  triggerContent,
  actionLabel,
  actionFormId,
  action,
  open,
  onOpenChange,
  className,
  children,
}: Props) => {
  const handleAction = async () => {
    if (!action) return
    const data = await action()
    if (data.error) {
      toastManager.add({
        description: data.message ?? "Error",
        title: "Something went wrong.",
        type: "error",
      })
    } else {
      onOpenChange(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button size="sm" />}>
        {triggerContent}
      </DialogTrigger>
      <DialogPopup
        className="bg-surface! max-h-fit w-fit overflow-y-visible p-0.75 sm:max-w-max"
        showCloseButton={false}
      >
        <div className="rounded-[12px] bg-background">
          <div className="shadow-modal-inner rounded-[12px]">
            <div className="contents">
              <div
                className={cn(
                  "flex h-125 max-h-[75vh] w-200 max-w-[90vw] flex-col overflow-y-auto will-change-[width,height]",
                  className
                )}
              >
                <div className="shadow-bottom sticky z-10 inline-flex h-11 w-full items-center justify-between p-2">
                  <div className="inline-flex items-center gap-x-1.5 px-1 py-0.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                    {icon}
                    <span className="tracking-snug truncate text-sm leading-6 font-medium">
                      {title}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-row items-center justify-end gap-x-6">
                    <DialogClose
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <Icons.x className="text-quiet size-3!" />
                    </DialogClose>
                  </div>
                </div>
                <DialogPanel className="flex size-full flex-col px-0 pb-0 in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-header]))]:pt-0">
                  <div className="flex flex-col items-stretch justify-start gap-4 px-4 pt-4 pb-6">
                    {children}
                  </div>
                </DialogPanel>
                <DialogFooter className="sticky z-10 bg-background">
                  {/* <DialogClose render={<Button variant="ghost" size="sm" />}>
                  Cancel
                </DialogClose> */}
                  <Button
                    size="sm"
                    type="submit"
                    form={actionFormId}
                    onClick={handleAction}
                  >
                    {actionLabel}
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </div>
        </div>
      </DialogPopup>
    </Dialog>
  )
}
