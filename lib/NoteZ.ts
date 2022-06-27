interface Note {
  id: Number
  creator_id: Number
  title: string
  content: string
}

interface UserData {
  id: Number
  email?: string
  name?: string
  notes: Array<Note>
}
