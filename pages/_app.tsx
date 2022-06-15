import { unstable_useWebVitalsReport } from "next/streaming"
import { getSession, SessionProvider } from "next-auth/react"
import { SSRProvider, ThemeProvider, theme } from "@primer/react"

import { NextPageContext } from "next"
import type { AppProps } from "next/app"

import deepmerge from "deepmerge"

import "./styles.scss"

const customTheme = deepmerge(theme, {
  fonts: {
    normal:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: "MonoLisa, monospace",
  },
})

export default function App({ Component, pageProps }: AppProps) {
  // unstable_useWebVitalsReport((data) => {
  //   console.log(data)
  // })

  return (
    <ThemeProvider theme={customTheme}>
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
