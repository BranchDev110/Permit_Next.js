import { getFetch, httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import SuperJSON from "superjson"
import { AppRouter } from "../server/app.router"

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc/"

    if (typeof window !== "undefined") {
      return {
        transformer: SuperJSON,
        links: [
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
      }
    }

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          }
        }
        return {}
      },
      links: [
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch()
            return fetch(input, {
              ...init,
              credentials: "include",
            })
          },
        }),
      ],
      transformer: SuperJSON,
    }
  },
  ssr: true,
})
// => { useQuery: ..., useMutation: ...}
