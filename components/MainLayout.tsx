import styled from "styled-components"
import Sidebar from "./Sidebar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout(props: Props) {
  return (
    <>
      <MainArea>
        <Sidebar />
        <MainContent>{props.children}</MainContent>
      </MainArea>
    </>
  )
}

export const MainArea = styled.div`
  height: 100%;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 21em;
`
