import fp from "fastify-plugin";
import { prisma } from "@figtree/prisma";

export const prismaPlugin = fp(async (app) => {
  await prisma.$connect();

  app.decorate("prisma", prisma);

  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
});
