import { signInSchema } from "@/src/server/schema/auth.schema"
import prisma from "@/src/utils/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = await signInSchema.parseAsync(credentials)

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        })

        if (!user) {
          return null
        }

        const isValidPassword = user.password === creds.password

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        if (session.user) {
          session.user.name = token.name
          session.user.email = token.email
        }
      }

      return session
    },
    redirect: async ({ url, baseUrl }: { url: string; baseUrl: string }) => {
      return Promise.resolve(url)
    },
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    newUser: "/register",
  },
}

export default NextAuth(nextAuthOptions)
