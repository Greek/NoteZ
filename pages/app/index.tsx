import { Button } from "@primer/react"
import { GetServerSideProps, NextPageContext } from "next"
import { getSession, signIn, useSession } from "next-auth/react"

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  return {
    props: {
    },
  }
}
