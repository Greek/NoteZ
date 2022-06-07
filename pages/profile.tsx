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

  if (!session) {
    return (
      <>
        <h1>Hi</h1>
      </>
    )
  }

  // If session exists, display content
  return (
    <>
      <MainLayout>
        <h1>Your profile</h1>

        {!props.user.given_name && "You don't have a name!"}
      </MainLayout>
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

  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    select: {
      given_name: true,
    },
  })

  if (!user)
    return {
      props: { user: null },
    }

  return {
    props: { user },
  }
}
