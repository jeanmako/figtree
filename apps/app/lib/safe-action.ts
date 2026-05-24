import { createSafeActionClient } from "next-safe-action";
import { auth } from "@figtree/features/auth/auth";
import { headers } from "next/headers";

export const actionClient = createSafeActionClient({
  handleServerError: async (e) => {
    console.error("Server action error:", e);

    // // Send error to Axiom
    // logger.error(e.message, e);
    // after(logger.flush());

    if (e instanceof Error) {
      return e.message;
    }

    return "An unknown error occurred.";
  },
});

export const authUserActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user.id) {
    throw new Error("Unauthorized: Login required.");
  }

  return next({
    ctx: {
      user: session.user,
    },
  });
});
