import Navbar from "./Navbar"
import type { ReactChildren } from "react"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar brandName={"Notez"} />
      <main>{children}</main>
    </>
  )
}
