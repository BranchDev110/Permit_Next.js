import { initTRPC } from "@trpc/server"
import { CreateNextContextOptions } from "@trpc/server/adapters/next"
import SuperJSON from "superjson"
import { getServerAuthSession } from "../utils/auth"
import prisma from "../utils/prisma"
import { signUpController } from "./controllers/auth.controller"
import {
  createInHouseReviewController,
  createOTCReviewWithOutPlansController,
  createOTCReviewWithPlansController,
} from "./controllers/permit.controller"
import { signUpSchema } from "./schema/auth.schema"
import {
  createInHouseReviewSchema,
  createOTCReviewWithPlansSchema,
  createOTCReviewWithOutPlansSchema,
} from "./schema/permit.schema"

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res })

  return {
    session,
    prisma,
  }
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({
  transformer: SuperJSON,
})

export const appRouter = t.router({
  getHello: t.procedure.query((req) => {
    return { message: "Welcome to Full-Stack tRPC CRUD App with Next.js" }
  }),
  createInHouseReview: t.procedure
    .input(createInHouseReviewSchema)
    .mutation(({ input }) => createInHouseReviewController({ input })),
  createOTCReviewWithPlans: t.procedure
    .input(createOTCReviewWithPlansSchema)
    .mutation(({ input }) => createOTCReviewWithPlansController({ input })),
  createOTCReviewWithOutPlans: t.procedure
    .input(createOTCReviewWithOutPlansSchema)
    .mutation(({ input }) => createOTCReviewWithOutPlansController({ input })),
  signUp: t.procedure.input(signUpSchema).mutation(({ input }) => signUpController(input)),
})

export type AppRouter = typeof appRouter
