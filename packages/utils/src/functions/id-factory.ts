/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomBytes } from "crypto"
import baseX from "base-x"

// TODO: Add more as we add Database tables
const prefixes = [
  "ws_", // workspace
  "usr_", // user
  "prof_", // profile
  "prj_", // project
  "con_", // contact
  "com_", // company
  "svc_", // service
  "pkg_", // package
  "adn_", // addon
  "inv_", // invoice
  "pay_", // payment
] as const

type Prefix = (typeof prefixes)[number]

const base36 = baseX("0123456789abcdefghijklmnopqrstuvwxyz")

function createULIDBuffer(): Uint8Array {
  const buf = new Uint8Array(16)
  const timestamp = BigInt(Date.now())

  // Use consistent bigint syntax
  buf[0] = Number((timestamp >> 40n) & 0xffn)
  buf[1] = Number((timestamp >> 32n) & 0xffn)
  buf[2] = Number((timestamp >> 24n) & 0xffn)
  buf[3] = Number((timestamp >> 16n) & 0xffn)
  buf[4] = Number((timestamp >> 8n) & 0xffn)
  buf[5] = Number(timestamp & 0xffn)

  buf.set(randomBytes(10), 6)
  return buf
}

/**
 * Create a prefixed ID
 * @example
 * createId({ prefix: "ws_" }) // => "ws_a1b2c3d4e5f6g7h8i9j0"
 * createId({ prefix: "usr_" }) // => "usr_k1l2m3n4o5p6q7r8s9t0"
 */
export const createId = ({ prefix }: { prefix: Prefix }) => {
  const buf = createULIDBuffer()
  const id = base36.encode(buf)
  return `${prefix}${id}`
}
