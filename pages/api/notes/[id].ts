import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export default async function getUser(req: NextRequest, res: NextResponse) {
  // @ts-ignore
  const id = req.query.id

  return handleGET(id, res)
}

async function handleGET(userId: Number, res: any) {
  const note = await prisma.note.findUnique({
    where: { id: Number(userId) },
    select: { content: true },
  })

  if (!note) return res.json({ error: "Not not found" })

  return res.json(note)
}
