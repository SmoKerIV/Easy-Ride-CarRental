import bcrypt from 'bcryptjs';
//import prisma from '../../lib/prisma';

async function userExists(username) {
  const user = await prisma.users.findUnique({
    where: {
      name: username,
    },
  });

  return Boolean(user);
}

async function createUser(username, hashedPassword) {
  const user = await prisma.users.create({
    data: {
      name: username,
      password: hashedPassword,
    },
  });

  return user;
}

export default async function register(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      if (await userExists(username)) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(username, hashedPassword);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  } else {
    res.status(405).json({ error: 'We only accept POST' });
  }
}