import { getSession, SessionProvider, useSession } from "next-auth/react"
import { SSRProvider, ThemeProvider } from "@primer/react"

import { NextPageContext } from "next"
import type { AppProps } from "next/app"

import MainLayout from "../components/MainLayout"
import LandingContent from "../components/LandingUI/LandingContent"

import "./styles.scss"

export default function App({ Component, pageProps }: AppProps) {
  // const { data: session, status } = useSession()
  // const loading = status === "loading"

  // if (!session) {
  //   return (
  //     <SessionProvider session={pageProps.session}>
  //       <LandingContent />
  //     </SessionProvider>
  //   )
  // }

  if (!pageProps.session) {
    return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <LandingContent>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </LandingContent>
      </SessionProvider>
    )
  } else if (pageProps.session) {
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
}

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
