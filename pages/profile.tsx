import { useState, useEffect } from "react"
import { getSession, useSession } from "next-auth/react"
import { NextPageContext } from "next"

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState()

  if (!session) return <h1>Hello world</h1>

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("/api/examples/protected")
//       const json = await res.json()
//       if (json.content) {
//         setContent(json.content)
//       }
//     }
//     fetchData()
//   }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <h1>Hi</h1>
      </>
    )
  }

  // If session exists, display content
  return (
    <>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
    return {
      props: {
        session: await getSession(context),
      },
    }
  }
  