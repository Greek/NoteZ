import { Note } from "@prisma/client"
import { fetcher } from "../lib/fetch"
import { unstable_useWebVitalsReport } from "next/streaming"
import { getSession, SessionProvider } from "next-auth/react"
import { SSRProvider, ThemeProvider, theme } from "@primer/react"

import { NextPageContext } from "next"
import type { AppProps } from "next/app"

import deepmerge from "deepmerge"

import "./styles.scss"
import useSWR from "swr"
import MainLayout from "../components/MainLayout"

const customTheme = deepmerge(theme, {
  fonts: {
    normal:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: "MonoLisa, monospace",
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR("/api/users/1", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const notes: Array<Note> = data?.notes

  return (
    <ThemeProvider theme={customTheme}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <SSRProvider>
          <MainLayout notes={notes}>
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
