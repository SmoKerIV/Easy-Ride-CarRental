import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req, {params}) => {
  const { id } = params;
  const parsedUserID = parseInt(id, 10);
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: parsedUserID,
      },
      include: {
        car: true, // Include the related Car data
      },
    });

    // Extract the car data from each booking
    const cars = bookings.map(booking => booking.car);

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