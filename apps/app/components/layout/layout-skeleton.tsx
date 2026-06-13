import { Spinner } from "@figtree/ui/components/spinner"

export const LayoutSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-16px)] items-center justify-center">
      <Spinner />
    </div>
  )
}
