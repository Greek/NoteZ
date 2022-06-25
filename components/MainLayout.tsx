import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar brandName={"Notez"} />
      <Sidebar></Sidebar>
      <main>{children}</main>
    </>
  )
}
