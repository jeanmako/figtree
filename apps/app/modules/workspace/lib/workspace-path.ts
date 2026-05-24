import { API_BASE } from "@/lib/api"

export function buildWorkspacePath(slug: string, path: string): string {
  if (!slug) {
    throw new Error("Missing workspace slug")
  }

  if (!path.startsWith("/")) {
    throw new Error("Path must start with '/'")
  }

  return `${API_BASE}/v1/workspaces/${slug}${path}`
}
