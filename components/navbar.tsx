import styles from "./navbar.module.scss"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  ActionMenu,
  ActionList,
  Avatar,
  Button,
  Header,
  Text,
} from "@primer/react"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Navbar() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <Header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <Header.Item full>
        <Header.Link href="/">
          <span>
            <Text fontSize={19}>NoteZ</Text>
          </span>
        </Header.Link>
      </Header.Item>

      <span
        className={`nojs-show ${
          !session && loading ? styles.loading : styles.loaded
        }`}
      >
        {!session && (
          <>
            <Button
              mr={30}
              href={`api/auth/signin/google`}
              onClick={(e) => {
                e.preventDefault()
                signIn("google")
              }}
            >
              Sign in with Google
            </Button>
          </>
        )}
        {session?.user && (
          <>
            {session.user.image && (
              <ActionMenu>
                <ActionMenu.Anchor>
                  <Header.Item
                    mr={0}
                    sx={{
                      borderWidth: 3,
                      borderColor: "gray",
                    }}
                  >
                    <Avatar
                      src={session.user.image}
                      size={32}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </Header.Item>
                </ActionMenu.Anchor>
                <ActionMenu.Overlay align="end">
                  <ActionList>
                    <ActionList.Item
                      onSelect={(event) => console.log("New file")}
                    >
                      User information
                    </ActionList.Item>
                    <ActionList.Divider />
                    <ActionList.Item
                      onClick={(e) => {
                        e.preventDefault()
                        signOut()
                      }}
                      variant="danger"
                    >
                      Sign out
                    </ActionList.Item>
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            )}
          </>
        )}
      </span>
    </Header>
  )
}
