export interface FetchError extends Error {
  code: string
  status: number
}

export async function fetcher<TResponse>(
  path: RequestInfo,
  init?: RequestInit
): Promise<TResponse> {
  const res = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json()
    const error = new Error(
      body.message ?? "An unexpected error occurred"
    ) as FetchError
    error.code = body.error // 'not_found', 'forbidden', etc.
    error.status = res.status // 404, 403, etc.
    throw error
  }

  return res.json()
}
