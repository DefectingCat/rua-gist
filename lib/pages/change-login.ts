import prisma from 'lib/PrismaClient';
import { decodeJWT } from 'lib/utils/jwt-tools';
import { logger } from 'lib/utils/logger-tools';
import { GetServerSidePropsContext, PreviewData } from 'next';
import nookies from 'nookies';
import { ParsedUrlQuery } from 'querystring';

export const checkLogin = async (
  req: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>['req']
) => {
  try {
    const cookies = nookies.get({ req });
    const token = cookies.token;
    if (!token) throw 'No token';

    const { payloadObj }: { payloadObj: any } = decodeJWT(token);
    if (!payloadObj) throw new Error('Token parse error!');

    const user = await prisma.user.findUnique({
      where: {
        email: payloadObj.data.email,
      },
      select: {
        id: true,
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
    if (!user) throw new Error('User in token was not found!');

    return {
      initialState: {
        users: {
          logined: true,
          ...JSON.parse(JSON.stringify(user)),
        },
      },
    };
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e);
    }
    return {};
  } finally {
    prisma.$disconnect();
  }
};
