import Link from "next/link"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

interface Props {
  notes: Array<Note>
  children: React.ReactNode
}

export default function MainLayout(props: Props) {
  return (
    <>
      <Navbar brandName={"Notez"} />
      <Sidebar
        notes={props.notes?.map((note) => {
          return (
            <ul>
              <li>
                <Link key={`${note.id}`} href={"/note/" + note.id}>
                  {note?.title}
                </Link>
              </li>
            </ul>
          )
        })}
      />
      <main>{props.children}</main>
    </>
  )
}
