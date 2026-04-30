import { buildServer } from "./server"

async function main() {
  const fastify = await buildServer()

  try {
    await fastify.listen({
      port: process.env.PORT ? Number.parseInt(process.env.PORT) : 4000,
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
