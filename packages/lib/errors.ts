import z from "zod"

export const ErrorCodes = {
  bad_request: 400,
  unauthorized: 401,
  session_expired: 401,
  forbidden: 403,
  exceeded_limit: 403,
  not_found: 404,
  conflict: 409,
  invite_pending: 409,
  invite_expired: 410,
  unprocessable_entity: 422,
  rate_limit_exceeded: 429,
  internal_server_error: 500,
} as const

export type ErrorCodeKey = keyof typeof ErrorCodes

export const ErrorCode = z.enum(
  Object.keys(ErrorCodes) as [ErrorCodeKey, ...ErrorCodeKey[]]
)

export class FigtreeApiError extends Error {
  public readonly code: ErrorCodeKey
  public readonly statusCode: number

  constructor({ code, message }: { code: ErrorCodeKey; message: string }) {
    super(message)
    this.name = "FigtreeApiError"
    this.code = code
    this.statusCode = ErrorCodes[code] // resolved once, carried on the error
  }
}

export const parseRequestBody = async (req: Request) => {
  try {
    return await req.json()
  } catch (e) {
    console.error(e)
    throw new FigtreeApiError({
      code: "bad_request",
      message:
        "Invalid JSON format in request body. Please ensure the request body is a valid JSON object.",
    })
  }
}
