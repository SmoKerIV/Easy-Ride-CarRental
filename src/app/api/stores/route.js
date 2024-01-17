import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, res) => {
  try {
    const stores = await prisma.stores.findMany();
    return NextResponse.json({
      success: true,
      stores: stores,

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
    const store = await prisma.stores.create({
      data: body
    });
    return NextResponse.json({
      success: true,
      store: store,
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
