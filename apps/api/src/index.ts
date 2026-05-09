import "dotenv/config"
import { buildServer } from "./server"
import { serverEnv } from "@figtree/shared/env/server"

async function main() {
  const fastify = await buildServer()

  try {
    await fastify.listen({
      port: serverEnv.PORT,
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
