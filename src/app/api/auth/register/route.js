import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const POST = async (req, res) => {
  const body = await req.json();

  // Validate the input
  if (!body.userName || !body.password || !body.email) {
    return NextResponse.json({
      success: false,
      message: 'Username, password and email are required',
    });
  }

  if (body.password.length < 8) {
    return NextResponse.json({
      success: false,
      message: 'Password should be at least 8 characters long',
    });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.users.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      user: user,
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