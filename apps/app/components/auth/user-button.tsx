"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@unboundly/ui/components/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unboundly/ui/components/avatar"
import { Icons } from "@unboundly/ui/components/icons"
// import { useCurrentUser } from "@/lib/auth/current-user";
import Link from "next/link"
import { ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
// import { ThemeToggleSm } from "@unboundly/ui/components/theme-toggle-sm";

type Props = {
  size?: "sm" | "lg"
}

export const UserButton = ({ size = "sm" }: Props) => {
  //   const [_open, setOpen] = useUserModal();
  const { data: session } = useSession()
  const user = session?.user
  console.log(user?.image)
  if (!user) {
    return null
  }

  switch (size) {
    case "sm": {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:shadow-outline focus-visible:ring-offset-none rounded-lg ring-offset-background transition-colors focus-visible:ring-0 focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-border">
            <Avatar className="mr-1.5 !h-8 !w-8 rounded-lg">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback className="rounded-lg">
                <Icons.placeholder className="h-full w-full" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="dark:bg-sidebar-background flex w-64 flex-col items-stretch justify-start rounded-xl border-border/50 shadow-lg"
            align="end"
            side="bottom"
          >
            <DropdownMenuGroup className="flex flex-col gap-y-0.5">
              <DropdownMenuItem className="gap-x-0 rounded-lg py-1.5 text-[15px] font-medium text-quiet">
                <Link
                  href="/network"
                  className="flex w-full min-w-0 items-center overflow-hidden"
                >
                  <Icons.user className="mr-2 !h-4 !w-4" />
                  My profile{" "}
                  {/* <span className="ml-1 text-tiny font-normal tracking-tight truncate">
                    @{user.username}
                  </span> */}
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                className="py-1.5 gap-x-0 rounded-lg text-quiet font-medium text-[15px]"
                onClick={() => setOpen(true)}
              >
                <Icons.settings className="!w-4 !h-4 mr-2 shrink-0" />
                Account settings
              </DropdownMenuItem> */}
              <DropdownMenuItem className="gap-x-0 rounded-lg py-1.5 text-[15px] font-medium text-quiet">
                <Link href="/network" className="flex items-center">
                  <Icons.layout className="mr-2 !h-4 !w-4" />
                  Creator Dashboard
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="py-1.5 rounded-lg gap-x-0">
                <LogoutButton
                  variant="ghost"
                  className="h-min shadow-sm  text-quiet font-medium text-[15px] w-fit text-sm p-0"
                >
                  <Icons.logout className="!w-4 !h-4 mr-2 shrink-0" />
                  Sign out
                </LogoutButton>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    case "lg": {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:shadow-outline focus-visible:ring-offset-none flex h-12 w-52 cursor-pointer items-center rounded-lg border px-1.5 shadow-xs ring-offset-background transition-colors focus-visible:ring-0 focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-border dark:border-0 dark:bg-secondary">
            <Avatar className="mr-1.5 size-9 rounded-sm">
              <AvatarImage src={user.image || "/placeholder.svg"} />
              <AvatarFallback className="rounded-lg">
                <Icons.placeholder className="h-full w-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col items-start overflow-hidden leading-tight">
              <div className="flex w-full items-center justify-between gap-x-1">
                <p className="truncate text-tiny font-medium tracking-tight">
                  {user.name}
                </p>
                <Icons.ellipsis className="mr-1 !size-3 shrink-0" />
              </div>
              <p className="w-full truncate text-start text-[12px] font-normal tracking-tight text-quiet">
                {user.email}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex w-68 flex-col items-stretch justify-start rounded-[12px] shadow-lg dark:bg-accent"
            align="end"
            side="bottom"
          >
            <DropdownMenuGroup className="flex flex-col gap-y-0.5">
              <DropdownMenuItem className="h-9.5 gap-x-0 rounded-md text-[15px] font-medium text-quiet hover:bg-secondary">
                <Link
                  href="/network"
                  className="flex w-full items-center overflow-hidden"
                >
                  <Icons.user2 className="mr-2 size-4.5" />

                  <p className="flex w-full min-w-0 items-center truncate">
                    My profile
                    <span className="font-inter ml-2 inline-block truncate text-tiny tracking-tight text-quiet">
                      @{user.email}
                    </span>
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="h-9.5 gap-x-0 rounded-md text-[15px] font-medium text-quiet"
                // onClick={() => setOpen(true)}
              >
                <Icons.settings className="mr-2 size-4.5 shrink-0" />
                Account settings
              </DropdownMenuItem>
              <DropdownMenuItem className="h-9.5 gap-x-0 rounded-md text-[15px] font-medium text-quiet">
                <Link href="/network" className="flex items-center">
                  <Icons.stack className="mr-2 size-4.5" />
                  Creator Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="h-9.5 gap-x-0 rounded-md text-[15px] font-medium text-quiet"
                // onClick={() => setOpen(true)}
              >
                <Icons.logout className="mr-2 size-4.5 shrink-0" />
                Sign out
              </DropdownMenuItem>
              {/* <div className="py-1 rounded-lg flex items-center justify-center bg-secondary/60">
                <ThemeToggleSm />
              </div> */}
              {/* <DropdownMenuItem className="py-1.5 rounded-lg gap-x-0">
                <LogoutButton
                  variant="ghost"
                  className="h-min text-quiet font-medium text-[15px] w-fit text-sm p-0"
                >
                  <Icons.logout className="!w-4 !h-4 mr-2 shrink-0" />
                  Sign out
                </LogoutButton>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    default:
      return null
  }
}
