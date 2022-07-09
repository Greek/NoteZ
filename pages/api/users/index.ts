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
  const { count } = req.query

  let allUsers
  if (Number(count))
    allUsers = await prisma.user.findMany({ take: Number(count) })
  else allUsers = await prisma.user.findMany()

  return res.status(200).json(allUsers)
}
