import { PrismaAdapter } from "@next-auth/prisma-adapter"

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../lib/prisma"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  // secret: process.env.NEXTAUTH_SECRET,
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
})
