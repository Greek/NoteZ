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
  try {
    const { id, content } = req.body

    const note = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    })

    return res.status(200).json(note)
  } catch (e) {
    console.log(e)
  }
}
