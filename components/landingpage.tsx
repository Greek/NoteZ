import { Button } from "@primer/react"
import { signIn } from "next-auth/react"

export default function LandingPage() {
  return (
    <>
      <Button
        sx={{ fontSize: 30 }}
        onClick={(e: KeyboardEvent | MouseEvent) => {
          e.preventDefault()
          signIn("google")
        }}
      >
        Sign in :)
      </Button>
    </>
  )
}
