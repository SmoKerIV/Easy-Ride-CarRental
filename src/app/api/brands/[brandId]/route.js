import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, {params}) => {
  const { brandId } = params;
  const parsedBrandId = parseInt(brandId, 10);
  try {
    const brand = await prisma.cars.findMany({
      where: {
        brandId: parsedBrandId,
      },
    });
    
    return NextResponse.json({
      success: true,
      brand: brand,
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