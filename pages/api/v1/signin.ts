import { MAX_AGE } from 'lib/constents';
import prisma from 'lib/PrismaClient';
import { generateJWT } from 'lib/utils/jwt-tools';
import { verifyPasswd } from 'lib/utils/password-tools';
import { compile } from 'lib/utils/validator-tools';
import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';
import { SignInReturn } from 'types/api';

const schema = {
  email: { type: 'string', min: 3, max: 255 },
  password: { type: 'string', min: 3, max: 255 },
};

const check = compile(schema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignInReturn>
) {
  const signin = async () => {
    try {
      const checkResult = await check(req.body);
      if (checkResult !== true)
        return res.status(401).json({
          status: 'error',
          message: 'params error.',
          data: checkResult,
        });

      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (!user)
        return res.status(401).json({
          status: 'error',
          message: 'email or password error.',
          data: {},
        });

      if (!verifyPasswd(req.body.password, user.password))
        return res.status(401).json({
          status: 'error',
          message: 'email or password error.',
          data: {},
        });

      const { id: _id, password: _password, ...returnUser } = user;
      const signature = generateJWT(returnUser);
      nookies.set({ res }, 'token', signature, {
        maxAge: MAX_AGE,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/',
      });
      res.status(200).json({
        status: 'sucess',
        message: 'login sucesss.',
        data: returnUser,
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
