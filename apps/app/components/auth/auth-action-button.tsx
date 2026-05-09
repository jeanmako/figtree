"use client";

import { ComponentProps } from "react";
import { ActionButton } from "@figtree/ui/components/action-button";

export function AuthActionButton({
  action,
  successMessage,
  ...props
}: Omit<ComponentProps<typeof ActionButton>, "action"> & {
  action: () => Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
}) {
  return (
    <ActionButton
      variant="secondary"
      size="lg"
      className="w-full relative"
      {...props}
      action={async () => {
        const res = await action();

        if (res.error) {
          return { error: true, message: res.error.message || "Action failed" };
        } else {
          return { error: false, message: successMessage };
        }
      }}
    />
  );
}
