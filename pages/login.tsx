import styled from "styled-components"

import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"

import { Box } from "../components/Box"
import { Button } from "@primer/react"
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <>
      <CenteredPage>
        <Box title="Login to Notez" centeredText>
          <Button
            onClick={(e: MouseEvent) => {
              e.preventDefault()
              signIn("google")
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </CenteredPage>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (session) {
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

export const CenteredPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
