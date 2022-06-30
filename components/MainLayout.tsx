import { Note } from "../lib/NoteZ"

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
      <Navbar brandName={"Notez"} />
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
      <MainArea>{props.children}</MainArea>
    </>
  )
}

export const MainArea = styled.div`
  display: flex;
  flex-direction: column;
`
