import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const test = async () => {
    const cookies = nookies.get({ req });

    try {
      const users = await prisma.user.findMany();
      console.log(users);
      nookies.set({ res }, 'test', 'hello', {
        maxAge: 30 * 24 * 60 * 60,
      });
      res.status(200).json('hello');
    } catch (error) {
      res.status(500);
    } finally {
      await prisma.$disconnect();
    }
  };

  switch (req.method) {
    case 'GET':
      return test();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
