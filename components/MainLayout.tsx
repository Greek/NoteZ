import { Note } from "@prisma/client"

import Link from "next/link"
import styled from "styled-components"
import useSWR from "swr"
import { fetcher } from "../lib/fetch"

import Navbar from "./Navbar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout(props: Props) {
  const { data, error } = useSWR("/api/users/1", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const notes: Array<Note> = data?.notes

  return (
    <>
      <MainArea>
        <SidebarContainer>
          <ul>
            {notes?.map((note) => {
              return (
                <li key={note?.id}>
                  <Link key={note?.id} href={"" + note.id}>
                    {note?.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </SidebarContainer>
        <MainContent>{props.children}</MainContent>
      </MainArea>
    </>
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

export const MainArea = styled.div`
  height: 100%;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 21em;
`
