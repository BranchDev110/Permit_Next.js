import { object, string, TypeOf } from "zod"

export const signInSchema = object({
  email: string().email(),
  password: string().min(4).max(12),
})

export const signUpSchema = signInSchema.extend({
  username: string(),
})

export type LoginSchemaType = TypeOf<typeof signInSchema>
export type RegisterSchemaType = TypeOf<typeof signUpSchema>
