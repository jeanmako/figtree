import { ReactNode } from "react"
import WorkspaceAuth from "@/modules/workspace/auth"

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <WorkspaceAuth>{children}</WorkspaceAuth>
}
