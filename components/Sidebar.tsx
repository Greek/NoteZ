import { Note } from "@prisma/client"
import { useSession } from "next-auth/react"
import { fetcher } from "../lib/fetch"
import { AvatarDropdown } from "./AvatarDropdown"

import Link from "next/link"
import styled from "styled-components"
import useSWR from "swr"
import Cookies from "js-cookie"

export default function Sidebar() {
  const { data: session } = useSession()

  const { data, error } = useSWR(
    [
      `/api/users/${session?.user?.email}`,
      Cookies.get("next-auth.session-token"),
    ],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const notes: Array<Note> = data?.notes

  const NoteDisplay = () => {
    if (session)
      return (
        <>
          <div>
            <AvatarDropdown />  Your Notes
          </div>{" "}
          <br />
          <ul>
            {notes?.map((note) => {
              return (
                <li key={note?.id}>
                  <Link key={note?.id} href={"note/" + note.id}>
                    {note?.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </>
      )
    else return <></>
  }

  return (
    <SidebarContainer>
      <NoteDisplay />
    </SidebarContainer>
  )
}

export const SidebarContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  padding-left: 1em;
  padding-top: 1em;
  margin-right: 2rem;
  position: fixed;
  float: left;
  width: 17rem;
  height: 100vh;
  background-color: rgba(217, 217, 217, 0.5);
`
