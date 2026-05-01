import { randomBytes } from "crypto";
import baseX from "base-x";

const base36 = baseX("0123456789abcdefghijklmnopqrstuvwxyz");

function createIdBuffer(): Uint8Array {
  const buf = new Uint8Array(16);

  const timestamp = BigInt(Date.now());

  // 48-bit timestamp (ULID-like ordering)
  buf[0] = Number((timestamp >> 40n) & 0xffn);
  buf[1] = Number((timestamp >> 32n) & 0xffn);
  buf[2] = Number((timestamp >> 24n) & 0xffn);
  buf[3] = Number((timestamp >> 16n) & 0xffn);
  buf[4] = Number((timestamp >> 8n) & 0xffn);
  buf[5] = Number(timestamp & 0xffn);

  buf.set(randomBytes(10), 6);

  return buf;
}

export function createId(): string {
  return base36.encode(createIdBuffer());
}
