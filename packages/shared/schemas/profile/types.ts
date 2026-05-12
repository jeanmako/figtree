import { z } from "zod"
import { ProfileSchema } from "./schema"

export type ProfileParams = z.infer<typeof ProfileSchema>
