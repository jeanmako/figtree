import { compare, hash } from "bcryptjs"

export async function hashPassword(password: string) {
  return await hash(password, 12)
}

export async function validatePassword({
  password,
  hash,
}: {
  password: string
  hash: string
}) {
  return await compare(password, hash)
}
