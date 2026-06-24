"use client"

import {
  // useWorkspacesQuery,
  useWorkspaceQuery,
} from "@/modules/workspace/hooks/workspace-query"
import { Button } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"
import { cn } from "@figtree/ui/lib/utils"
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
  MenuSeparator,
  MenuGroup,
} from "@figtree/ui/components/menu"
import { signOut } from "@figtree/features/auth/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const WorkspaceMenu = () => {
  const router = useRouter()
  const { name, slug } = useWorkspaceQuery()
  // const { workspaces } = useWorkspacesQuery()

  return (
    <Menu>
      <div className="relative me-2 flex h-full items-center">
        <MenuTrigger
          render={
            <Button
              variant="inverse"
              size="xl"
              className={cn("w-fit max-w-52 min-w-9 justify-start px-0 py-0")}
            />
          }
        >
          <div className="flex h-full w-full items-center p-1 pe-2">
            <Icons.logo className="size-7" />
            <div className="ml-1 inline-flex h-full flex-1 items-center overflow-hidden">
              <span className="truncate text-sm leading-6 font-semimedium text-foreground-inverse">
                {name}
              </span>
            </div>
          </div>
        </MenuTrigger>
        <MenuPopup className="w-68">
          {/* <MenuGroup>
          {workspaces?.map((workspace) => (
            <MenuItem
              className="justify-between"
              key={workspace.slug}
              render={<Link href={`/${workspace.slug}`} />}
            >
              {workspace.name}
              {workspace.slug === slug && (
                <Icons.checkFill className="size-3.75" />
              )}
            </MenuItem>
          ))}
        </MenuGroup> */}
          <MenuGroup>
            <MenuItem render={<Link href="/onboarding/workspace" />}>
              <Icons.plus />
              New workspace
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuItem>
              <Icons.user />
              Account settings
            </MenuItem>
            <MenuItem render={<Link href={`/${slug}/settings`} />}>
              <Icons.settings />
              Workspace settings
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem
            onClick={async () =>
              await signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/login")
                  },
                },
              })
            }
          >
            <Icons.logout />
            Sign out
          </MenuItem>
        </MenuPopup>
      </div>
    </Menu>
  )
}
