import LandingNavbar from "./LandingNavbar"

interface LandingProps {
  children?: React.ReactNode
}

export default function LandingContent(props: LandingProps) {
  return (
    <>
      <LandingNavbar brandName="NoteZ"></LandingNavbar>
      <div>{props.children}</div>
    </>
  )
}
