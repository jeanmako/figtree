import React from "react"
import { cn } from "@figtree/ui/lib/utils"
import { Label } from "@figtree/ui/components/label"
import { Card, CardFrame, CardFrameFooter } from "@figtree/ui/components/card"

const SectionCard = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      data-slot="section-card"
      className={cn(
        "flex w-full flex-initial flex-col gap-y-3 bg-background",
        className
      )}
    >
      {children}
    </div>
  )
}
const SectionCardFrame = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <CardFrame
      data-slot="section-card-frame"
      className={cn("border-0", className)}
    >
      {children}
    </CardFrame>
  )
}

const SectionCardContent = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <Card
      data-slot="section-card-content"
      className={cn(
        "w-full rounded-xl border-0 bg-background shadow-square dark:bg-sidebar",
        className
      )}
    >
      <ul
        data-slot="section-card-list"
        className="m-0 list-none p-0 [&_[data-slot=section-card-row]:not(:last-child)]:after:absolute [&_[data-slot=section-card-row]:not(:last-child)]:after:right-4 [&_[data-slot=section-card-row]:not(:last-child)]:after:bottom-0 [&_[data-slot=section-card-row]:not(:last-child)]:after:left-4 [&_[data-slot=section-card-row]:not(:last-child)]:after:h-px [&_[data-slot=section-card-row]:not(:last-child)]:after:bg-border [&_[data-slot=section-card-row]:not(:last-child)]:after:content-['']"
      >
        {children}
      </ul>
    </Card>
  )
}

const SectionCardItem = ({
  className,
  children,
  title,
  description,
  htmlFor,
}: {
  className?: string
  title: string
  description?: string
  htmlFor?: string
  children: React.ReactNode
}) => {
  return (
    <li
      data-slot="section-card-row"
      className={cn(
        "relative flex min-h-0 items-center justify-between gap-3 px-4 py-3",
        className
      )}
    >
      <div
        data-slot="section-card-row-label-wrapper"
        className={cn(
          "flex min-w-0 grow flex-col flex-wrap gap-0.5",
          className
        )}
      >
        <Label data-slot="section-card-row-label" htmlFor={htmlFor}>
          {title}
        </Label>
        {description && (
          <p
            data-slot="section-card-row-description"
            className="text-tiny leading-4 font-medium tracking-snug text-quiet"
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </li>
  )
}

const SectionCardHeader = ({
  title,
  description,
  addOn,
}: {
  title: string
  description?: string
  addOn?: React.ReactNode
}) => {
  return (
    <div
      data-slot="section-card-header"
      className="flex w-full flex-row items-center justify-between gap-x-3 px-3"
    >
      <div className="flex w-full flex-col items-start justify-start">
        <span className="text-sm leading-5 font-semimedium tracking-snug">
          {title}
        </span>
        {description && (
          <p className="text-tiny leading-4 font-medium tracking-snug text-quiet">
            {description}
          </p>
        )}
      </div>
      {addOn && addOn}
    </div>
  )
}

const SectionCardFooter = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <CardFrameFooter className="px-4 py-2">
      <div
        data-slot="section-card-footer"
        className={cn("flex justify-end gap-1", className)}
      >
        {children}
      </div>
    </CardFrameFooter>
  )
}

export {
  SectionCardItem as SectionCardRow,
  SectionCard,
  SectionCardContent,
  SectionCardHeader,
  SectionCardFooter,
  SectionCardFrame,
}
