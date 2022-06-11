import Navbar from "./navbar"
import type { ReactChildren } from "react"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
