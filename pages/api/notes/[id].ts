import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const id = req.query.id

  return handleGET(Number(id), res)
}

async function handleGET(userId: Number, res: NextApiResponse) {
  const note = await prisma.note.findUnique({
    where: { id: Number(userId) },
    select: { content: true },
  })

  if (!note) return res.status(404).json({ error: "Note not found." })

  return res.status(200).json(note)
}
