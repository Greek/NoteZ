import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export default async function getUser(req: NextRequest, res: NextResponse) {
  // @ts-ignore
  const id = req.query.id

  return handleGET(id, res)
}

async function handleGET(userId: Number, res: any) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { id: true, given_name: true, notes: true },
  })

  if (!user) return res.json({ error: "User not found" })

  return res.json(user)
}
