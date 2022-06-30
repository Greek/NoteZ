import { Note } from "@prisma/client"

export interface UserData {
  id: Number
  email?: string
  name?: string
  notes: Array<Note>
}
