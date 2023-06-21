import prisma from "@/src/utils/prisma"
import { TRPCError } from "@trpc/server"
import { RegisterSchemaType } from "../schema/auth.schema"

export const signUp = async (input: RegisterSchemaType) => {
  const { username, email, password } = input

  const exists = await prisma.user.findFirst({
    where: { email },
  })

  if (exists) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "User already exists",
    })
  }

  const result = await prisma.user.create({
    data: input,
  })

  return result
}
