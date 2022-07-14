import useTranslation from 'lib/hooks/useTranslation';
import { decodeJWT } from 'lib/utils/jwt-tools';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import nookies from 'nookies';
import { ReactElement } from 'react';
import prisma from 'lib/PrismaClient';
import { logger } from 'lib/utils/logger-tools';

const MainLayout = dynamic(() => import('layouts/MainLayout'));

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto">
        <h1></h1>
        The way to explore good idea.
        <div>{t('Hello')}</div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
      props: {
        initialState: {
          users: {
            logined: true,
            ...JSON.parse(JSON.stringify(user)),
          },
        },
      },
    };
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e);
    }
    return {
      props: {},
    };
  } finally {
    prisma.$disconnect();
  }
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
