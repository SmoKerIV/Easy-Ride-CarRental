import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, res) => {
  try {
    const booking = await prisma.booking.findMany();
    return NextResponse.json({
      success: true,
      booking: booking,

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



export const POST = async (req, res) => {
  const body = await req.json();
  try {
    const book = await prisma.book.create({
      data: body
    });
    return NextResponse.json({
      success: true,
      book: book,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}
