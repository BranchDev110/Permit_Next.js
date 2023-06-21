import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { trpc } from "../utils/trpc"
import "./global.css"
import Header from "../components/Header"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
