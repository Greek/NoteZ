import ReactMarkdown from "react-markdown"

import useSWR from "swr"

import MainLayout from "../../components/MainLayout"
import remarkGfm from 'remark-gfm'
import { Button } from "@primer/react"

/* @ts-ignore */
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export default function Note(props: any) {
  const { data, error } = useSWR("/api/notes/3", fetcher)
  const note: Note = data

  return (
    <>
      <MainLayout>
        <ReactMarkdown
          children={note?.content}
          remarkPlugins={[remarkGfm]}
        />
        <textarea>edit :)</textarea>
      </MainLayout>
    </>
  )
}

export const getServerProps = async () => {}
