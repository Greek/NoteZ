import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { json } from "stream/consumers"

import prisma from "../../../lib/prisma"

export default async function getNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case "GET":
      return handleGET(req, res)
    case "PATCH":
      return handlePATCH(req, res)
    default:
      return res.status(405).json({ error: "Only GET methods are allowed." })
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const noteId = Number(id)

  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token)
    return res
      .status(401)
      .json({ error: "A token is required to make this request." })

  const notezUser = await prisma.user.findUnique({
    where: { email: `${token.email}` },
    select: { id: true, notes: true },
  })

  if (!Number.isInteger(noteId))
    return res.status(404).json({ error: "Please provide a valid ID." })

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  })

  if (!note) return res.status(404).json({ error: "Note not found." })
  if (!notezUser?.notes.find((note) => noteId == note?.id)) {
    return res.status(404).json({ error: "This isn't your note... :think:" })
  }

  return res.status(200).json(note)
}

async function handlePATCH(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const { content } = req.body
  const noteId = Number(id)

  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token)
    return res
      .status(401)
      .json({ error: "Please provide a valid token." })

  const notezUser = await prisma.user.findUnique({
    where: { email: `${token.email}` },
    select: { id: true, notes: true },
  })

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  })

  if (!note) return res.status(404).json({ error: "Note not found." })
  if (!notezUser?.notes.find((note) => noteId == note?.id)) {
    return res.status(404).json({ error: "This isn't your note... :think:" })
  }

  const newResult = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      content: content ?? note?.content,
    },
  })

  return res.status(200).json({ content: newResult?.content })
}
