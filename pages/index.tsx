import { NextPageContext } from "next"
import { getSession, useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"
import LandingPage from "../components/landingpage"
import navbarStyles from "../components/navbar.module.scss"

export default function IndexPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (!session) return <LandingPage />

  return <h1>What's Up.!</h1>
}

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
