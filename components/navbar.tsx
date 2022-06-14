import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@primer/react"
import { useRouter } from "next/router"
import { device } from "../constants/breakpoints"

import styled from "styled-components"
import { AvatarDropdown } from "./AvatarDropdown"

interface NavbarProps {
  brandName: String
  compact?: Boolean
}

export default function Navbar(props: NavbarProps) {
  const router = useRouter()

  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <NavbarContainer>
      <NavbarContent brandName={props.brandName} compact={props.compact}>
        <NavbarStart>
          <h3>
            {session?.user?.name?.split(" ")[0]}' {props.brandName}
          </h3>
        </NavbarStart>
        <NavbarEnd>
          {!session && (
            <Button
              onClick={(e: MouseEvent | KeyboardEvent) => {
                e.preventDefault()
                signIn("google")
              }}
            >
              Sign in
            </Button>
          )}
          {session && (
            // <Button
            //   onClick={(e: MouseEvent | KeyboardEvent) => {
            //     e.preventDefault()
            //     signOut()
            //   }}
            // >
            //   Sign out
            // </Button>
            <AvatarDropdown compact={props.compact} />
          )}
        </NavbarEnd>
      </NavbarContent>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.div`
  position: relative;
  left: 0px;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1rem;
  background-color: rgb(217, 217, 217, 0.5);
`

const NavbarContent = styled.div`
  display: flex;
  padding: 0 1.11rem;
  align-items: center;
  justify-content: space-between;

  @media ${device.mobileS} {
    height: 2rem;
  }

  @media ${device.tablet} {
    height: ${(props: NavbarProps) => (props.compact ? "2rem" : "3rem")};
  }
`

const NavbarStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const NavbarEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
