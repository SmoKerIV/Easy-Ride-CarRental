import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export default async function GET(req, res) {
  try{
    const cars = await prisma.cars.findMany();
    NextResponse.json({
      success: true,
      cars: cars
    });
  }
  catch{
    NextResponse.json({
      success: false,
      message: error.message
    });
  }
}
