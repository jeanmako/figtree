import { Button } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"
import React from "react"

type Props = {}

const ServicesPage = (props: Props) => {
  return (
    <div>
      <div className="inline-flex h-12 w-full min-w-fit items-center justify-between gap-x-3 overflow-hidden px-3 shadow-bottom">
        <div className="inline-flex w-full flex-1 items-center gap-x-2.5"></div>
        <div className="inline-flex items-center gap-x-3">
          <Button variant="outline" size="sm">
            <Icons.biload className="text-quiet" />
            Import / Export
          </Button>
          {/* <AddClientModal /> */}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
