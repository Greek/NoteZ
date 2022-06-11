import { SessionProvider } from "next-auth/react"
import { PageLayout, ThemeProvider } from "@primer/react"
import { BaseStyles } from "@primer/react"

import type { AppProps } from "next/app"
import "./styles.scss"
import Navbar from "../components/navbar"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ThemeProvider>
        <Navbar />
        <PageLayout>
          <PageLayout.Pane position="start" divider="line">
            <h1>sup</h1>
          </PageLayout.Pane>
          <PageLayout.Content>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </PageLayout.Content>
        </PageLayout>
      </ThemeProvider>
    </SessionProvider>
  )
}
