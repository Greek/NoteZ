import { useState, useEffect } from "react"
import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps, GetStaticProps, NextPageContext } from "next"

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

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
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

        {props.user.given_name
          ? props.user.given_name
          : "You don't have a name!"}
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { user: [] } }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    select: {
      given_name: true,
    },
  })

  return {
    props: { user },
  }
}
