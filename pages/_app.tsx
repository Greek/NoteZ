import { getSession, SessionProvider } from "next-auth/react"
import { SSRProvider, ThemeProvider } from "@primer/react"

import { NextPageContext } from "next"
import type { AppProps } from "next/app"

import MainLayout from "../components/MainLayout"
import "./styles.scss"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <SSRProvider>
          <MainLayout>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </MainLayout>
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
