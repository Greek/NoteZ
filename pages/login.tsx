import styled from "styled-components"

import { Button } from "@primer/react"

import { Box } from "../components/Box"
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

export const CenteredPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
