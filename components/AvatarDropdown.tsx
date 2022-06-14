import { ActionList, ActionMenu, Avatar } from "@primer/react"
import { signOut, useSession } from "next-auth/react"
import { Compactness } from "./UIConstants"

interface AvatarProps {
  compact?: Boolean
}

export const AvatarDropdown = (props: AvatarProps) => {
  const { data: session } = useSession()

  return (
    <>
      <ActionMenu>
        <ActionMenu.Anchor>
          <Avatar
            src={session?.user?.image!}
            sx={{
              cursor: "pointer",
            }}
            size={props.compact ? 26 : 35}
            alt="Your profile picture."
          />
        </ActionMenu.Anchor>

        <ActionMenu.Overlay align="end">
          <ActionList>
            <ActionList.Item
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
              variant="danger"
            >
              Sign out
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </>
  )
}
