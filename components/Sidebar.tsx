import styled from "styled-components"
import React from "react"

export default function Sidebar(props: React.ReactNode) {
  return (
    <>
      <SidebarContainer></SidebarContainer>
    </>
  )
}

export const SidebarContainer = styled.div`
  display: flex;
  float: left;
  padding-left: 1em;
  padding-top: 1em;
  margin-right: 2rem;
  width: 17rem;
  min-height: 95vh;
  background-color: rgba(217, 217, 217, 0.5);
`
