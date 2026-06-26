import { hash, verify, Options } from "@node-rs/argon2"

const ARGON2_OPTIONS: Options = {
  algorithm: 2,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, ARGON2_OPTIONS)
}

export async function validatePassword({
  password,
  hash: storedHash,
}: {
  password: string
  hash: string
}): Promise<boolean> {
  try {
    return await verify(storedHash, password, ARGON2_OPTIONS)
  } catch {
    // A corrupt hash, wrong algorithm prefix, etc. should fail closed.
    return false
  }
}
