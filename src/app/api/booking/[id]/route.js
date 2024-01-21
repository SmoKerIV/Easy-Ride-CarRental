import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, {params}) => {
  const { id } = params;

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
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
};


export const DELETE = async (req, {params}) => {
  const { id } = params;
console.log(id)
  try {
    const book = await prisma.booking.delete({
      where: {
        Id: Number(id),
      },
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
};



export const PUT = async (req, {params}) => {
  const { id } = params;
console.log(id)
  try {
    const book = await prisma.booking.updatenp({
      where: {
        id: Number(id),
      },
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
};