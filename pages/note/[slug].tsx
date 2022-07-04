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
import { device } from "../../constants/breakpoints"

/* @ts-ignore */
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export default function NotePage(props: any) {
  const router = useRouter()
  const { slug } = router.query

  const { data, error } = useSWR(`/api/notes/${slug}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })
  const note: Note = data

  const textAreaRef = useRef(null)
  const [previewText, setPreviewText] = useState("")
  const [delayedPreviewText, setDelayedPreviewText] = useState("")

  // When the page changes, set the note content back to its original state.
  useEffect(() => {
    setPreviewText(note?.content!)
    setDelayedPreviewText(note?.content!)

    // @ts-ignore
    textAreaRef!.current!.value = note?.content
  }, [data])

  useEffect(() => {
    const waitTime = setTimeout(() => {
      setDelayedPreviewText(previewText)
    }, 250)

    fetch("/api/notes/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: Number(slug),
        // @ts-ignore
        content: textAreaRef!.current!.value,
      }),
    })

    return () => clearTimeout(waitTime)
  }, [previewText])

  return (
    <>
      <EditorContainer>
        <PreviewArea>
          <PreviewAreaDetails></PreviewAreaDetails>
          <ReactMarkdown
            children={delayedPreviewText}
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
