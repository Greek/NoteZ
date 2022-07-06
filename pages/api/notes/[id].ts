import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

import prisma from "../../../lib/prisma"

export default async function getNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case "GET":
      return handleGET(req, res)
    default:
      return res.status(405).json({ error: "Only GET methods are allowed." })
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const headers = req.headers

  if (!headers["authorization"]) 
    return res
      .status(401)
      .json({ error: "An authorization token is required." })

  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token) return res.status(401).json({ error: "This token is invalid." })

  const note = await prisma.note.findUnique({
    where: { id: id },
    select: { content: true },
  })

  // if note.

  if (!note) return res.status(404).json({ error: "Note not found." })

  return res.status(200).json(note)
}
