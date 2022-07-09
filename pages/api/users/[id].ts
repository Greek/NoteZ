import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function getUser(
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
  const userId = req.query.id

  const user = await prisma.user.findUnique({
    where: { id: String(userId) },
    select: { id: true, name: true, notes: true },
  })

  if (!user) return res.status(404).json({ error: "User not found" })

  return res.status(200).json(user)
}
