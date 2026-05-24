import { Button } from "@figtree/ui/components/button";
import { Icons } from "@figtree/ui/components/icons";
import React from "react";
import { NextButton } from "../next-button";

export const OnboardingWelcomeView = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-5 w-full h-full">
      <div>
        <Icons.logo className="size-16 shrink-0" />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-3xl/tight font-semibold">Welcome to Figtree</h2>
        <p className="text-sm font-medium text-center text-quiet">
          Figtree is the front-office platform for modern development and design
          teams. Streamline your workflows, enhance collaboration, and deliver
          exceptional projects with ease.
        </p>
        <NextButton text="Get started" step="workspace" className="w-3/4" />
      </div>
    </div>
  );
};
