import ReactMarkdown from "react-markdown"

import useSWR from "swr"

import MainLayout from "../../components/MainLayout"
import remarkGfm from "remark-gfm"
import { Button } from "@primer/react"
import { useRouter } from "next/router"

/* @ts-ignore */
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export default function Note(props: any) {
  const router = useRouter()
  const { slug } = router.query

  const { data, error } = useSWR(`/api/notes/${slug}`, fetcher)
  const note: Note = data
  return (
    <>
      <ReactMarkdown children={note?.content} remarkPlugins={[remarkGfm]} />
      <textarea defaultValue={note?.content} />
    </>
  )
}

export const getServerProps = async () => {}
