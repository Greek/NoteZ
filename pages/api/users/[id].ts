import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export default async function getUser(req: NextRequest, res: NextResponse) {
  // @ts-ignore
  const id = req.query.id

  return handleGET(id, res)
}

async function handleGET(userId: Number, res: NextResponse) {
  const user = await prisma.user.findUnique({
    where: { id: String(userId) },
    select: { id: true, name: true, notes: true },
  })

  // @ts-ignore
  if (!user) return res.json({ error: "User not found" })

  // @ts-ignore
  return res.json(user)
}
