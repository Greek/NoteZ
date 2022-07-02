import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const id = req.query.id

  return handleGET(id, res)
}

async function handleGET(userId: Number, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { id: true, given_name: true, notes: true },
  })

  if (!user) return res.status(404).json({ error: "User not found" })

  return res.status(200).json(user)
}
