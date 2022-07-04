import { Note } from "@prisma/client"

import styled from "styled-components"
import React from "react"

interface SidebarProps {
  notes: Array<Note>
  children: React.ReactNode
}

export default function Sidebar(props: any) {
  return (
    <>
      <div>
        <SidebarContainer>{props.notes}</SidebarContainer>
      </div>
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
