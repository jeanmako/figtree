import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "@figtree/prisma"
import { hashPassword, validatePassword } from "./password"
import {
  TOTP_CODE_LENGTH,
  TOTP_EXPIRY_IN,
  PASSWORD_RESET_TOKEN_EXPIRY,
} from "./constants"
import { twoFactor, emailOTP } from "better-auth/plugins"
import { createAuthMiddleware } from "better-auth/api"
import { serverEnv } from "@figtree/shared/env/server"
import { nextCookies } from "better-auth/next-js"
import { createId } from "@figtree/utils/functions/id-factory"

const APP_URL = serverEnv.CLIENT_ORIGIN!
const IS_PROD = serverEnv.NODE_ENV === "production"

export const auth = betterAuth({
  appName: "Figtree",
  trustedOrigins: [APP_URL],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: PASSWORD_RESET_TOKEN_EXPIRY,
    maxPasswordLength: 72,
    password: {
      hash: hashPassword,
      verify: validatePassword,
    },
  },
  socialProviders: {
    github: {
      clientId: serverEnv.GITHUB_CLIENT_ID as string,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID as string,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    cookiePrefix: IS_PROD ? "__Secure-figtree" : "figtree",
    useSecureCookies: IS_PROD,
    defaultCookieAttributes: {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // slide the window once per day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5-min client-side cache → fewer DB round-trips
    },
  },
  plugins: [
    twoFactor({
      issuer: "Figtree",
      totpOptions: {
        period: TOTP_EXPIRY_IN,
        digits: TOTP_CODE_LENGTH,
      },
    }),
    emailOTP({
      overrideDefaultEmailVerification: true,
      sendVerificationOnSignUp: true,
      expiresIn: 300,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          serverEnv.NODE_ENV === "production"
            ? {}
            : console.log("Your verification code: ", otp)
        } else if (type === "forget-password") {
          // Send the OTP for email verification
        } else {
          return
        }
      },
    }),
    nextCookies(),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            // upsert → safe to retry / replay (e.g. webhook re-delivery)
            await prisma.profile.upsert({
              where: { userId: user.id },
              update: {},
              create: {
                id: createId(),
                userId: user.id,
                // Default to UTC; let the client update this on first load
                // via PATCH /api/profile  (see profile-router.ts)
                timezone: "UTC",
              },
            })

            console.info("[auth] Profile created", { userId: user.id }) // TODO: Implement Pino or Axiom for logging
          } catch (error) {
            console.error(
              "[auth] Profile creation failed — user has no profile",
              {
                userId: user.id,
                error,
              }
            )
            // Re-throw so Better Auth rolls back the user row and returns a
            // 500 to the client rather than silently creating a broken account.
            throw error
          }
        },
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              image: `https://api.dicebear.com/9.x/thumbs/svg?seed=${ctx.body.email}`, // generate a unique avatar based on the user's email using Dicebear's API
            },
          },
        }
      }
    }),
  },
  user: {
    additionalFields: {
      role: {
        type: ["internal", "client", "admin"], // TODO: Pass in the roles from a shared package instead of hardcoding them here
        required: false,
        defaultValue: "internal",
        input: false, // don't allow user to set role
      },
    },
  },
})
