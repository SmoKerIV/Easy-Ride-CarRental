import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, {params}) => {
  const { brandId } = params;
  const parsedBrandId = parseInt(brandId, 10);
  try {
    const cars = await prisma.cars.findMany({
      where: {
        brandId: parsedBrandId,
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