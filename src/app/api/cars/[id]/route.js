import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, {params}) => {
  const { id } = params;

  try {
    const car = await prisma.cars.findUnique({
      where: {
        id: Number(id),
      },
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
};


export const DELETE = async (req, {params}) => {
  const { id } = params;
console.log(id)
  try {
    const car = await prisma.cars.delete({
      where: {
        Id: Number(id),
      },
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
};



export const PUT = async (req, {params}) => {
  const { id } = params;
  const body = await req.json();
console.log(id)
  try {
    const car = await prisma.cars.update({
      where: {
        id: Number(id),   
      },
      data: body,
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
};