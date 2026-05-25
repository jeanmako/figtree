import {
  useWorkspacesQuery,
  useWorkspaceQuery,
} from "@/modules/workspace/hooks/workspace-query"
import { Button } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"
import { useSidebar } from "@figtree/ui/components/sidebar"
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
  const { workspaces } = useWorkspacesQuery()
  const { state } = useSidebar()

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              "h-12 w-full justify-start rounded-none py-0 pr-12 pl-3",
              state === "collapsed" && "h-9.75"
            )}
          />
        }
      >
        <div className="flex w-full items-center">
          <Icons.logo className="size-6" />
          <div className="inline-flex flex-1 items-center overflow-hidden">
            <div className="mr-1 ml-3 truncate text-base font-semibold tracking-tight">
              {name}
            </div>
            <Icons.chevronSelector className="size-3.5 shrink-0 text-duper" />
          </div>
        </div>
      </MenuTrigger>
      <MenuPopup className="w-68">
        <MenuGroup>
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
        </MenuGroup>
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
    </Menu>
  )
}
