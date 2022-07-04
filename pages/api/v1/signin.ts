import prisma from 'lib/PrismaClient';
import { generateJwt } from 'lib/utils/jwt-tools';
import { verifyPasswd } from 'lib/utils/password-tools';
import { compile } from 'lib/utils/validator-tools';
import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

const schema = {
  email: { type: 'string', min: 3, max: 255 },
  password: { type: 'string', min: 3, max: 255 },
};

const check = compile(schema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signin = async () => {
    try {
      const checkResult = await check(req.body);
      if (checkResult !== true) return res.status(403).json(checkResult);

      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (!user)
        return res.status(403).json({
          status: 'email or password error.',
        });

      if (!verifyPasswd(req.body.password, user.password))
        return res.status(403).json({
          status: 'email or password error.',
        });

      const signature = generateJwt(user);
      nookies.set({ res }, 'token', signature, {
        maxAge: 30 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      });
      res.status(200).json({
        status: 'sucess',
      });
    } catch (error) {
      res.status(500);
    } finally {
      await prisma.$disconnect();
    }
  };

  switch (req.method) {
    case 'POST':
      return signin();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
