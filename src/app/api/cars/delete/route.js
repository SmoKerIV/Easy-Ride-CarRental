import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    await prisma.cars.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Car deleted successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}