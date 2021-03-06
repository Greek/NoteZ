import { useRouter } from "next/router"
import { Note } from "@prisma/client"
import { useEffect, useRef, useState } from "react"

import ReactMarkdown from "react-markdown"
import styled from "styled-components"

import useSWR from "swr"

import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import remarkEmoji from "remark-emoji"
import remarkHtml from "remark-html"
import remarkParse from "remark-parse"
import Cookies from "js-cookie"

import { device } from "../../constants/breakpoints"
import { fetcher } from "../../lib/fetch"
import { getSession } from "next-auth/react"
import { GetServerSideProps, NextPageContext } from "next"

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default function NotePage(props: any) {
  const router = useRouter()
  const { slug } = router.query

  const { data, error } = useSWR(
    [`/api/notes/${slug}`, Cookies.get("next-auth.session-token")],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  )
  const note: Note = data

  const textAreaRef = useRef(null)
  const [previewText, setPreviewText] = useState("")

  // When the page changes, set the note content back to its original state.
  useEffect(() => {
    setPreviewText(note?.content!)
    console.log(note)

    // @ts-ignore
    textAreaRef!.current!.value = note?.content
  }, [data])

  const performSaveAction = () => {
    fetch(`/api/notes/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("next-auth.session-token"),
      },

      body: JSON.stringify({
        id: Number(slug),
        // @ts-ignore
        content: textAreaRef!.current!.value,
      }),
    })
  }

  return (
    <>
      <EditorContainer>
        <PreviewArea>
          <PreviewAreaDetails></PreviewAreaDetails>
          <ReactMarkdown
            children={previewText}
            remarkPlugins={[
              remarkGfm,
              remarkBreaks,
              remarkEmoji,
              remarkHtml,
              remarkParse,
            ]}
          />
        </PreviewArea>
        <EditorArea>
          <EditorTextArea
            ref={textAreaRef}
            defaultValue={previewText}
            onChange={(e) => {
              setPreviewText(e.target.value)
              performSaveAction()
            }}
          />
        </EditorArea>
      </EditorContainer>
    </>
  )
}

export const EditorContainer = styled.div`
  display: flex;
`

export const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  height: 95vh;
  flex-grow: 1;
  @media screen and (max-width: ${device.tablet}) {
    display: flex;
    /* flex-direction: row; */
  }
`

export const PreviewAreaDetails = styled.div``

export const EditorArea = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  padding: 2em;
  min-width: 36%;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  background-color: rgba(217, 217, 217, 0.5);
`

export const EditorTextArea = styled.textarea`
  @media ${device.tablet} {
    flex-direction: row;
  }
  background-color: transparent;
  height: 100%;
  max-width: 100%;
  resize: none;
  border: none;
  outline: none;
  color: #303030;
`
