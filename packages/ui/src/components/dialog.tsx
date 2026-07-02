"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { cn } from "@figtree/ui/lib/utils"
import { Button } from "@figtree/ui/components/button"
import { ScrollArea } from "@figtree/ui/components/scroll-area"

const Dialog = DialogPrimitive.Root

const DialogPortal = DialogPrimitive.Portal

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-25 bg-black/25 transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      data-slot="dialog-backdrop"
      {...props}
    />
  )
}

function DialogViewport({
  className,
  ...props
}: DialogPrimitive.Viewport.Props) {
  return (
    <DialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-30 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
        className
      )}
      data-slot="dialog-viewport"
      {...props}
    />
  )
}

function DialogPopup({
  className,
  children,
  showCloseButton = true,
  bottomStickOnMobile = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  bottomStickOnMobile?: boolean
}) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport
        className={cn(
          bottomStickOnMobile && "max-sm:grid-rows-[1fr_auto] max-sm:pt-12"
        )}
      >
        <DialogPrimitive.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 max-h-[60vh] w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 transform-gpu overflow-y-scroll rounded-xl! bg-background text-foreground data-[state=closed]:animate-[dialog-content-hide_100ms] data-[state=open]:animate-[dialog-content-show_100ms]",
            bottomStickOnMobile &&
              "max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:opacity-[calc(1-min(var(--nested-dialogs),1))] max-sm:before:hidden max-sm:before:rounded-none max-sm:data-ending-style:translate-y-4 max-sm:data-starting-style:translate-y-4",
            className
          )}
          data-slot="dialog-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="absolute inset-e-2 top-2"
              render={<Button size="icon-sm" variant="ghost" />}
            >
              <XIcon />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogViewport>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pb-3 max-sm:pb-4",
        className
      )}
      data-slot="dialog-header"
      {...props}
    />
  )
}

function DialogFooter({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "bare"
}) {
  return (
    <div
      className={cn(
        "flex max-h-11 min-h-11 flex-1 flex-col-reverse items-center gap-2 px-2 sm:flex-row sm:justify-end sm:rounded-b-[12px]",
        variant === "default" && "border-t",
        variant === "bare" &&
          "pt-4 pb-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pt-3",
        className
      )}
      data-slot="dialog-footer"
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      className={cn("font-heading text-xl leading-none", className)}
      data-slot="dialog-title"
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-quiet", className)}
      data-slot="dialog-description"
      {...props}
    />
  )
}

function DialogPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ScrollArea>
      <div
        className={cn(
          "px-6 pb-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-header])]:pt-1 in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-footer]))]:pb-6! in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-footer].border-t))]:pb-1 in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-header]))]:pt-6",
          className
        )}
        data-slot="dialog-panel"
        {...props}
      />
    </ScrollArea>
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogBackdrop,
  DialogBackdrop as DialogOverlay,
  DialogPopup,
  DialogPopup as DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogPanel,
  DialogViewport,
}
