import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export default async function getUser(req: NextRequest, res: NextResponse) {
  // @ts-ignore
  const id = req.query.id

  handleGET(id, res)
}

async function handleGET(userId: Number, res: any) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  })
  res.json(user)
}
