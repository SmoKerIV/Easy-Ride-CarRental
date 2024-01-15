import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, ...data } = req.body;

    const updatedCar = await prisma.cars.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json(updatedCar);
    
  } else {

    res.status(405).json({ error: 'Method not allowed' });
  }
}