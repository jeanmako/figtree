import React from "react";
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
} from "@figtree/ui/components/dialog";

import { Icons } from "@figtree/ui/components/icons";
import { Button } from "@figtree/ui/components/button";
import { cn } from "@figtree/ui/lib/utils";

type Props = {
  icon: React.ReactNode;
  title: string;
  triggerContent: React.ReactNode;
  actionLabel: string;
  actionFormId?: string;
  action?: () => Promise<{ error: boolean; message?: string }>;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button size="sm" />}>
        {triggerContent}
      </DialogTrigger>
      <DialogPopup
        className="sm:max-w-max bg-surface! p-0.75 overflow-y-visible max-h-fit w-fit"
        showCloseButton={false}
      >
        <div className="rounded-[12px] bg-background">
          <div className="rounded-[12px] shadow-modal-inner">
            <div className="contents">
              <div
                className={cn(
                  "flex flex-col overflow-y-auto h-125 max-h-[75vh] w-200 max-w-[90vw] will-change-[width,height]",
                  className,
                )}
              >
                <div className="h-11 w-full sticky p-2 shadow-bottom z-10 inline-flex items-center justify-between">
                  <div className="inline-flex items-center py-0.5 px-1 gap-x-1.5 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0">
                    {icon}
                    <span className="text-sm font-medium leading-6 truncate tracking-snug">
                      {title}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-row items-center justify-end gap-x-6">
                    <DialogClose
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <Icons.x className="size-3! text-quiet" />
                    </DialogClose>
                  </div>
                </div>
                <DialogPanel className="px-0 in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-header]))]:pt-0 pb-0 size-full flex flex-col">
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
                    onClick={action}
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
  );
};
