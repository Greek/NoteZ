import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"

interface ProfileProps {
  user: {
    given_name: String
  }
}

export default function ProtectedPage(props: ProfileProps) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (typeof window !== "undefined" && loading) return null

  return (
    <>
      <h1>Your profile</h1>

      {session?.user?.name}
    </>
  )
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
    props: {},
  }
}
