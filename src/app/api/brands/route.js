import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, res) => {
  try {
    const brands = await prisma.brands.findMany();
    return NextResponse.json({
      success: true,
      brands: brands,

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
    const brand = await prisma.brands.create({
      data: body
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
}
