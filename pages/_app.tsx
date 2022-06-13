import { unstable_useWebVitalsReport } from "next/streaming"
import { getSession, SessionProvider } from "next-auth/react"
import { PageLayout, SSRProvider, ThemeProvider } from "@primer/react"

import type { AppProps } from "next/app"
import "./styles.scss"
import Navbar from "../components/navbar"
import { NextPageContext } from "next"

export default function App({ Component, pageProps }: AppProps) {
  unstable_useWebVitalsReport((data) => {
    console.log(data)
  })

  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <SSRProvider>
          <Navbar />
          <PageLayout>
            <PageLayout.Content>
              {/* @ts-ignore */}
              <Component {...pageProps} />
            </PageLayout.Content>
          </PageLayout>
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
