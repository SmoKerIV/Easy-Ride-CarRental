import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { name } = req.query;

    const cars = name 
      ? await prisma.cars.findMany({
          where: {
            name: {
              contains: name,
            },
          },
        })
      : await prisma.cars.findMany();

    res.status(200).json(cars);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}