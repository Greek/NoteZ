import { unstable_useWebVitalsReport } from "next/streaming"
import { getSession, SessionProvider } from "next-auth/react"
import { SSRProvider, PageLayout, ThemeProvider } from "@primer/react"

import { NextPageContext } from "next"
import type { AppProps } from "next/app"

import "./styles.scss"

export default function App({ Component, pageProps }: AppProps) {
  unstable_useWebVitalsReport((data) => {
    console.log(data)
  })

  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <SSRProvider>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </SSRProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
