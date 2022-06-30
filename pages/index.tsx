import { Button } from "@primer/react"
import { NextPageContext } from "next"
import { getSession, signIn, useSession } from "next-auth/react"

import MainLayout from "../components/MainLayout"

export default function IndexPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (!session)
    return (
      <Button
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          signIn("google")
        }}
      >
        Log in
      </Button>
    )

  return <h1>What's Up.!</h1>
}

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
