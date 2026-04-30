import "dotenv/config"
import { serverEnv } from "@figtree/shared/env/server"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma/client"

const connectionString = `${serverEnv.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
export const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
  })

declare global {
  var prisma: PrismaClient | undefined
}

if (serverEnv.NODE_ENV === "development") global.prisma = prisma
