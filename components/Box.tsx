import styled from "styled-components"

interface BoxProps {
  title: String
  centeredText?: Boolean
  children: React.ReactNode
}

export const Box = (props: BoxProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <BoxContainer centeredText={props.centeredText}>
        <BoxTitle>{props.title}</BoxTitle>
        {props.children}
      </BoxContainer>
    </>
  )
}

export const BoxContainer = styled.div`
  /* outline: red solid 1px; */
  text-align: ${(props: BoxProps) => (props.centeredText ? "center" : "unset")};
  display: flex;
  flex-direction: column;
  border: 2px rgba(112, 112, 112, 0.4) solid;
  padding: 0.6rem;
  border-radius: 0.3rem;
`

export const BoxTitle = styled.h3`
  padding-bottom: 1rem;
`
