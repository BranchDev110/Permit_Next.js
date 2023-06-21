import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter, createTRPCContext } from "../../../server/app.router"

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
})
