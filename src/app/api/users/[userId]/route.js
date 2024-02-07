import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, {params}) => {
  const { userID } = params;
  const parsedUserID = parseInt(userID, 10);
  try {
    const cars = await prisma.cars.findMany({
      where: {
        userId: parsedUserID,
      },
    });
    
    return NextResponse.json({
      success: true,
      cars: cars,
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