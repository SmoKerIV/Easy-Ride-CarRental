import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const authOptions = {

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials,req) {
        const user = await prisma.users.findUnique({
          where: { email : credentials.email },
        });

        if (user) {
          const isValid = await compare(credentials.password, user.password);

          if (isValid) {
            return NextResponse.json({ 
              success: true,
              id: user.id,
              name: user.email });
          } else {
            return NextResponse.json({ success: false, message: "Invalid password" });
          }
        } 
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
