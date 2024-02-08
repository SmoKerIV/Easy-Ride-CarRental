import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, res) => {

  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get("query") || undefined;

  try {
    const cars = await prisma.cars.findMany({
      where: {
        name: {
          contains: query,
        },
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



export const POST = async (req, res) => {
  const body = await req.json();
  try {
    const car = await prisma.cars.create({
      data: body
    });
    return NextResponse.json({
      success: true,
      car: car,
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
