export const workspaceKeys = {
  // Core
  all: () => ["workspaces"] as const,
  detail: (slug?: string) => ["workspaces", slug] as const,
  list: () => ["workspaces", "list"] as const,
  userWorkspaces: () => ["workspaces", "user"] as const,

  // Members
  members: (slug?: string) => ["workspaces", slug, "members"] as const,
  member: (slug?: string, memberId?: string) =>
    ["workspaces", slug, "members", memberId] as const,
  myMembership: (slug?: string) =>
    ["workspaces", slug, "members", "me"] as const,

  // Invites
  invites: (slug?: string) => ["workspaces", slug, "invites"] as const,
  invite: (slug?: string, inviteId?: string) =>
    ["workspaces", slug, "invites", inviteId] as const,

  // Settings & Billing
  settings: (slug?: string) => ["workspaces", slug, "settings"] as const,
  billing: (slug?: string) => ["workspaces", slug, "billing"] as const,
  branding: (slug?: string) => ["workspaces", slug, "branding"] as const,

  // Stats
  stats: (slug?: string) => ["workspaces", slug, "stats"] as const,

  // Nested resources
  projects: (slug?: string) => ["workspaces", slug, "projects"] as const,
  clients: (slug?: string) => ["workspaces", slug, "clients"] as const,
  invoices: (slug?: string) => ["workspaces", slug, "invoices"] as const,

  // Features
  planCheck: (slug?: string, feature?: string) =>
    ["workspaces", slug, "plan", feature] as const,
  limits: (slug?: string) => ["workspaces", slug, "limits"] as const,

  // Public access
  public: (slug?: string) => ["workspaces", "public", slug] as const,
} as const
