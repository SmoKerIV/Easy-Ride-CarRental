import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = "hush"; 

export const POST = async (req, res) => {
  const body = await req.json();

  if (!body.userName || !body.password) {
    return NextResponse.json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        userName: body.userName,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        userName: user.userName,
      },
      secretKey,
      { expiresIn: "12h" } 
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};
