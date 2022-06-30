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

/* @ts-ignore */
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export default function Note(props: any) {
  const router = useRouter()
  const { slug } = router.query

  const { data, error } = useSWR(`/api/notes/${slug}`, fetcher)
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
  }, [note])

  useEffect(() => {
    const waitTime = setTimeout(() => {
      setDelayedPreviewText(previewText)
    }, 250)

    return () => clearTimeout(waitTime)
  }, [previewText])

  return (
    <>
      <EditorContainer>
        <PreviewArea>
          <ReactMarkdown
            children={delayedPreviewText ? delayedPreviewText : note?.content!}
            remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji, remarkHtml]}
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
`

export const EditorArea = styled.div`
  display: flex;
  padding: 2em;
  min-width: 50%;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  flex-direction: column;
  background-color: rgba(217, 217, 217, 0.5);
`

export const EditorTextArea = styled.textarea`
  background-color: rgba(145, 145, 145, 0.5);
  height: 14rem;
  width: 35rem;
  resize: none;
  border: none;
  color: #303030;
`
