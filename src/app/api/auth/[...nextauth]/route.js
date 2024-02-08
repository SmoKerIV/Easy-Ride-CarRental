import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const authOptions = {

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXT_AUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
  
      async authorize(credentials, req) {
        const user = await prisma.users.findUnique({
          where: { email : credentials.email },
        });
  
        if (user) {
          const isValid = await compare(credentials.password, user.password);
  
          if (isValid) {
            return NextResponse.json({ 
              success: true,
              id: user.id,
              name: user.email 
            });
          } else {
            return NextResponse.json({ success: false, message: "Invalid password" });
          }
        } else {
          return NextResponse.json({ success: false, message: "User not found" });
        }
      },
    }),
  ],
  
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
