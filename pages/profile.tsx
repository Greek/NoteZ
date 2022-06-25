import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"

import prisma from "../lib/prisma"
import MainLayout from "../components/MainLayout"

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
      <MainLayout>
        <h1>Your profile</h1>

        {session?.user?.name}
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
