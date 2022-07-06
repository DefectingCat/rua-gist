import nookies from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/PrismaClient';
import { decodeJWT } from 'lib/utils/jwt-tools';
import { logger } from 'lib/utils/logger-tools';

const log = logger.child({ api: 'check-login' });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkLogin = async () => {
    try {
      const cookies = nookies.get({ req });
      const token = cookies.token;
      if (!token)
        return res.status(401).json({
          status: 'sucess',
          message: 'no token.',
          data: {},
        });

      const { payloadObj }: { payloadObj: any } = decodeJWT(token);
      if (!payloadObj) {
        log.error('Token parse error!');
        return res.status(401).json({
          status: 'error',
          message: 'token parse error.',
          data: {},
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: payloadObj.data.email,
        },
      });
      if (!user) {
        log.error('User in token was not found!');
        return res.status(401).json({
          status: 'error',
          message: 'user in token was not found.',
          data: {},
        });
      }

      const { id: _id, password: _password, ...returnUser } = user;
      log.info('check sucess.');
      res.status(200).json({
        status: 'sucess',
        message: 'check sucesss.',
        data: returnUser,
      });
    } catch (e) {
      if (e instanceof Error) {
        log.error(e);
      }
      return res.status(500).json({
        status: 'error',
        message: 'internal server error.',
        data: {},
      });
    } finally {
      prisma.$disconnect();
    }
  };

  switch (req.method) {
    case 'GET':
      return checkLogin();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
