"use client"

import { ErrorCodes } from "@figtree/lib/errors"
import { useWorkspaceQuery } from "@/modules/workspace/hooks/workspace-query"
import { LayoutSkeleton } from "@/components/layout/layout-skeleton"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

export default function WorkspaceAuth({ children }: { children: ReactNode }) {
  //   const { slug } = useParams();
  const { loading, error } = useWorkspaceQuery()

  if (loading) {
    return <LayoutSkeleton />
  }

  if (error) {
    if (error.status === ErrorCodes.not_found) {
      notFound()
    }
    // } else if (
    //   [ErrorCodes.invite_pending, ErrorCodes.invite_expired].includes(
    //     error.status,
    //   )
    // ) {
    //   redirect(`/${slug}/invite`);
    // }
  }

  return children
}
