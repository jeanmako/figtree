import { Icons } from "@figtree/ui/components/icons"

export type NavAreaKey = "main" | "settings"

export type NavItem = {
  name: string
  href: string
  icon?: React.ReactNode
  badge?: number | string
  exact?: boolean
  isActive?: (pathname: string, href: string) => boolean
}

export type NavGroup = {
  name?: string
  items: NavItem[]
}

export type NavArea = {
  title: string
  backHref?: string
  content: NavGroup[]
}

export type NavAreaData = {
  slug: string
  pathname: string
  inboxCount?: number
}

export type NavAreas = Record<NavAreaKey, (data: NavAreaData) => NavArea>

export const NAV_AREAS: NavAreas = {
  main: ({ slug, inboxCount }) => ({
    title: "Figtree",
    content: [
      {
        items: [
          {
            name: "Overview",
            href: `/${slug}/home`,
            icon: <Icons.grid />,
            exact: true,
          },
          {
            name: "Focus",
            href: `/${slug}/focus`,
            icon: <Icons.crosshair />,
          },
          {
            name: "Inbox",
            href: `/${slug}/inbox`,
            // icon: <Icons.inbox />,
            badge: inboxCount,
          },
        ],
      },
      {
        name: "Work",
        items: [
          {
            name: "Projects",
            href: `/${slug}/projects`,
            icon: <Icons.folder />,
          },
          {
            name: "Proposals",
            href: `/${slug}/proposals`,
            icon: <Icons.paperPlane />,
          },
          {
            name: "Contracts",
            href: `/${slug}/contracts`,
            icon: <Icons.contract />,
          },

          {
            name: "Deals",
            href: `/${slug}/deals`,
            icon: <Icons.dollar />,
          },
        ],
      },
      {
        name: "Clients",
        items: [
          {
            name: "Contacts",
            href: `/${slug}/clients`,
            icon: <Icons.users />,
          },
          {
            name: "Companies",
            href: `/${slug}/companies`,
            icon: <Icons.building />,
          },
        ],
      },
      {
        name: "Finance",
        items: [
          {
            name: "Invoices",
            href: `/${slug}/invoices`,
            icon: <Icons.invoice />,
          },
          {
            name: "Retainers",
            href: `/${slug}/retainers`,
            icon: <Icons.dollar />,
          },
          {
            name: "Expenses",
            href: `/${slug}/expenses`,
            icon: <Icons.wallet />,
          },
        ],
      },
    ],
  }),

  settings: ({ slug }) => ({
    title: "Settings",
    backHref: `/${slug}`,
    content: [
      {
        name: "Workspace",
        items: [
          {
            name: "General",
            href: `/${slug}/settings`,
            icon: <Icons.layout />,
            exact: true,
          },
          {
            name: "Billing",
            href: `/${slug}/settings/billing`,
            icon: <Icons.dollar />,
          },
          {
            name: "Services",
            href: `/${slug}/settings/services`,
            icon: <Icons.dollar />,
          },
          {
            name: "Scope engine",
            href: `/${slug}/settings/scope`,
            icon: <Icons.users />,
          },
          {
            name: "Members",
            href: `/${slug}/settings/members`,
            icon: <Icons.users />,
          },
          {
            name: "Plans",
            href: `/${slug}/settings/plans`,
            icon: <Icons.diamond />,
          },
          {
            name: "Notifications",
            href: `/${slug}/settings/notifications`,
            icon: <Icons.info />,
          },
          {
            name: "Applications",
            href: `/${slug}/settings/apps`,
            icon: <Icons.grid />,
          },
          {
            name: "Security",
            href: `/${slug}/settings/security`,
            icon: <Icons.fingerprint />,
          },
          {
            name: "Advanced",
            href: `/${slug}/settings/advanced`,
            icon: <Icons.info />,
          },
        ],
      },
      {
        name: "Portal",
        items: [
          {
            name: "Branding",
            href: `/${slug}/settings/branding`,
            icon: <Icons.colors />,
          },
          {
            name: "Custom domain",
            href: `/${slug}/settings/domain`,
            icon: <Icons.globe />,
          },
        ],
      },
    ],
  }),
}
