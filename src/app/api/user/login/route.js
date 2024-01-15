import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { username: username },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}