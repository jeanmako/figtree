"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@unboundly/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unboundly/ui/components/avatar";
import { Icons } from "@unboundly/ui/components/icons";
// import { useCurrentUser } from "@/lib/auth/current-user";
import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
// import { ThemeToggleSm } from "@unboundly/ui/components/theme-toggle-sm";

type Props = {
  size?: "sm" | "lg";
};

export const UserButton = ({ size = "sm" }: Props) => {
  //   const [_open, setOpen] = useUserModal();
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user?.image);
  if (!user) {
    return null;
  }

  switch (size) {
    case "sm": {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-lg ring-offset-background transition-colors focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-border focus-visible:shadow-button focus-visible:ring-0 focus-visible:ring-offset-none">
            <Avatar className="!h-8 !w-8 rounded-lg mr-1.5">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback className="rounded-lg">
                <Icons.placeholder className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex flex-col items-stretch justify-start w-64 rounded-xl border-border/50 shadow-lg dark:bg-sidebar-background"
            align="end"
            side="bottom"
          >
            <DropdownMenuGroup className="flex flex-col gap-y-0.5">
              <DropdownMenuItem className="py-1.5 gap-x-0 rounded-lg text-quiet font-medium text-[15px]">
                <Link
                  href="/network"
                  className="flex items-center overflow-hidden w-full min-w-0"
                >
                  <Icons.user className="!w-4 !h-4 mr-2" />
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
              <DropdownMenuItem className="py-1.5 gap-x-0 rounded-lg text-quiet font-medium text-[15px]">
                <Link href="/network" className="flex items-center">
                  <Icons.layout className="!w-4 !h-4 mr-2" />
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
      );
    }

    case "lg": {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-52 h-12 px-1.5 border shadow-xs dark:border-0 dark:bg-secondary cursor-pointer flex items-center rounded-lg ring-offset-background transition-colors focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-border focus-visible:shadow-button focus-visible:ring-0 focus-visible:ring-offset-none">
            <Avatar className="size-9 rounded-sm mr-1.5">
              <AvatarImage src={user.image || "/placeholder.svg"} />
              <AvatarFallback className="rounded-lg">
                <Icons.placeholder className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start leading-tight w-full overflow-hidden">
              <div className="flex items-center justify-between gap-x-1 w-full">
                <p className="truncate text-tiny font-medium tracking-tight">
                  {user.name}
                </p>
                <Icons.ellipsis className="!size-3 mr-1 shrink-0" />
              </div>
              <p className="truncate text-start w-full text-[12px] font-normal text-quiet tracking-tight">
                {user.email}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex flex-col items-stretch justify-start w-68 rounded-[12px] shadow-lg dark:bg-accent"
            align="end"
            side="bottom"
          >
            <DropdownMenuGroup className="flex flex-col gap-y-0.5">
              <DropdownMenuItem className="hover:bg-secondary h-9.5 gap-x-0 rounded-md text-quiet font-medium text-[15px]">
                <Link
                  href="/network"
                  className="flex items-center overflow-hidden w-full"
                >
                  <Icons.user2 className="size-4.5 mr-2" />

                  <p className="w-full truncate flex items-center min-w-0">
                    My profile
                    <span className="ml-2 font-inter text-tiny tracking-tight text-quiet truncate inline-block">
                      @{user.email}
                    </span>
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="h-9.5 gap-x-0 rounded-md text-quiet font-medium text-[15px]"
                // onClick={() => setOpen(true)}
              >
                <Icons.settings className="size-4.5 mr-2 shrink-0" />
                Account settings
              </DropdownMenuItem>
              <DropdownMenuItem className="h-9.5 gap-x-0 rounded-md text-quiet font-medium text-[15px]">
                <Link href="/network" className="flex items-center">
                  <Icons.stack className="size-4.5 mr-2" />
                  Creator Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="h-9.5 gap-x-0 rounded-md text-quiet font-medium text-[15px]"
                // onClick={() => setOpen(true)}
              >
                <Icons.logout className="size-4.5 mr-2 shrink-0" />
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
      );
    }
    default:
      return null;
  }
};
