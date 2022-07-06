import { MAX_AGE } from 'lib/constents';
import prisma from 'lib/PrismaClient';
import { generateJWT } from 'lib/utils/jwt-tools';
import { verifyPasswd } from 'lib/utils/password-tools';
import { compile } from 'lib/utils/validator-tools';
import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';
import { SignInReturn } from 'types/api';
import { logger } from 'lib/utils/logger-tools';

const schema = {
  email: { type: 'string', min: 3, max: 255 },
  password: { type: 'string', min: 3, max: 255 },
};

const check = compile(schema);

const log = logger.child({ api: 'sigin' });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignInReturn>
) {
  const signin = async () => {
    log.info('access accept');
    try {
      const checkResult = await check(req.body);
      if (checkResult !== true) {
        log.info('params error');
        return res.status(401).json({
          status: 'error',
          message: 'params error.',
          data: checkResult,
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
        select: {
          id: true,
          password: true,
          name: true,
          email: true,
          bio: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
          twitterUsername: true,
          blog: true,
          followers: true,
          following: true,
        },
      });
      if (!user) {
        log.error('user not exist.');
        return res.status(401).json({
          status: 'error',
          message: 'email or password error.',
          data: {},
        });
      }

      if (!verifyPasswd(req.body.password, user.password)) {
        log.error('email or password error.');
        return res.status(401).json({
          status: 'error',
          message: 'email or password error.',
          data: {},
        });
      }

      const { password: _password, ...returnUser } = user;
      const signature = generateJWT(returnUser);
      nookies.set({ res }, 'token', signature, {
        maxAge: MAX_AGE,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/',
      });
      log.info('login sucess.');
      res.status(200).json({
        status: 'sucess',
        message: 'login sucesss.',
        data: returnUser,
      });
    } catch (e) {
      log.error(e);
      return res.status(500).json({
        status: 'error',
        message: 'internal server error.',
        data: {},
      });
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
