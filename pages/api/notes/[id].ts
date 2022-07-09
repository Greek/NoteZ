import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { json } from "stream/consumers"

import prisma from "../../../lib/prisma"

const TOKEN_INVALID = "Please provide a valid token."
const ID_INVALID = "Please provide a valid ID."
const NOTE_NOT_FOUND = "Note not found."
const NOTE_NOT_YOURS = "This note does not belong to you."

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
    case "DELETE":
      return handleDELETE(req, res)
    default:
      return res
        .status(405)
        .json({ error: "Only GET, PATCH and DELETE methods are allowed." })
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const noteId = Number(id)

  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token) return res.status(401).json({ error: TOKEN_INVALID })

  const notezUser = await prisma.user.findUnique({
    where: { email: `${token.email}` },
    select: { id: true, notes: true },
  })

  if (!Number.isInteger(noteId))
    return res.status(404).json({ error: ID_INVALID })

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  })

  if (!note) return res.status(404).json({ error: NOTE_NOT_FOUND })
  if (!notezUser?.notes.find((note) => noteId == note?.id)) {
    return res.status(401).json({ error: NOTE_NOT_YOURS })
  }

  return res.status(200).json(note)
}

async function handlePATCH(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const { content } = req.body
  const noteId = Number(id)

  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token) return res.status(401).json({ error: TOKEN_INVALID })

  const notezUser = await prisma.user.findUnique({
    where: { email: `${token.email}` },
    select: { id: true, notes: true },
  })

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  })

  if (!note) return res.status(404).json({ error: NOTE_NOT_FOUND })
  if (!notezUser?.notes.find((note) => noteId == note?.id)) {
    return res.status(401).json({ error: NOTE_NOT_YOURS })
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

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const noteId = Number(id)

  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token) return res.status(401).json({ error: TOKEN_INVALID })

  const notezUser = await prisma.user.findUnique({
    where: { email: `${token.email}` },
    select: { id: true, notes: true },
  })

  if (!Number.isInteger(noteId))
    return res.status(404).json({ error: ID_INVALID })

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  })

  if (!note) return res.status(404).json({ error: NOTE_NOT_FOUND })
  if (!notezUser?.notes.find((note) => noteId == note?.id)) {
    return res.status(401).json({ error: NOTE_NOT_YOURS })
  }

  await prisma.note.delete({
    where: {
      id: noteId,
    },
  })

  return res.status(200).json({ result: "Note deleted." })
}
