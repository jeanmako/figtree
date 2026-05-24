import { Redis } from "@upstash/redis"
import { serverEnv } from "@figtree/shared/env/server"

// Initiate Redis instance by connecting to REST URL
export const redis = new Redis({
  url: serverEnv.UPSTASH_REDIS_REST_URL || "",
  token: serverEnv.UPSTASH_REDIS_REST_TOKEN || "",
})

// Special Redis instance with timeout
export const redisWithTimeout = new Redis({
  url: serverEnv.UPSTASH_REDIS_REST_URL || "",
  token: serverEnv.UPSTASH_REDIS_REST_TOKEN || "",
  signal: () => AbortSignal.timeout(1000),
})
