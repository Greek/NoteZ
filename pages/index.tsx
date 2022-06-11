import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"
import LandingPage from "../components/landingpage"
import navbarStyles from "../components/navbar.module.scss"

export default function IndexPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (!session)
    return (
      <span
        className={`nojs-show ${
          !session && loading ? navbarStyles.loading : navbarStyles.loaded
        }`}
      >
        <LandingPage />
      </span>
    )

  return <h1>hi</h1>
}
