import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../../lib/prisma"

export default async function createNoteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case "POST":
      return handlePOST(req, res)
    default:
      return res.status(405).json({ error: "Only POST methods are allowed." })
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { id, content } = req.body

  const note = await prisma.note.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  })

  if (!note)
    return res.status(401).json({ error: "Cannot edit non-existent note." })

  return res.status(200).json(note)
}
