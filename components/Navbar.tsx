import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@primer/react"
import { useRouter } from "next/router"
import { device } from "../constants/breakpoints"

import styled from "styled-components"
import { AvatarDropdown } from "./AvatarDropdown"
import { COMPACTNESS } from "../constants/compactness"

interface NavbarProps {
  brandName: String
  noteTitle?: String
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
          <h4>
            {props.brandName} / {props.noteTitle}
          </h4>
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
          {session && <AvatarDropdown compact={props.compact} />}
        </NavbarEnd>
      </NavbarContent>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.div`
  position: relative;
  left: 0px;
  width: 100%;
  font-size: 0.1rem;
  margin-bottom: 1rem;
  background-color: rgb(217, 217, 217, 0.5);
`

const NavbarContent = styled.div`
  display: flex;
  padding: 0 1.11rem;
  align-items: center;
  justify-content: space-between;

  @media ${device.mobileS} {
    height: ${COMPACTNESS.COMPACT};
  }

  @media ${device.tablet} {
    height: ${(props: NavbarProps) =>
      props.compact ? COMPACTNESS.COMPACT : COMPACTNESS.COMFORTABLE};
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
