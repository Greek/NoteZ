import { Note } from "@prisma/client"

import Link from "next/link"
import styled from "styled-components"

import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

interface Props {
  notes: Array<Note>
  children: React.ReactNode
}

export default function MainLayout(props: Props) {
  return (
    <>
      <MainArea>
        <Sidebar
          notes={props.notes?.map((note) => {
            return (
              <ul>
                <li>
                  <Link key={`${note.id}`} href={"/note/" + note.id}>
                    {note?.title}
                  </Link>
                </li>
              </ul>
            )
          })}
        />
        {props.children}
      </MainArea>
    </>
  )
}

export const MainArea = styled.div`
  display: flex;
  flex-direction: column;
`
