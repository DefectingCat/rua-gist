import useTranslation from 'lib/hooks/useTranslation';
import { decodeJWT } from 'lib/utils/jwt-tools';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import nookies from 'nookies';
import { ReactElement } from 'react';
import prisma from 'lib/PrismaClient';

const MainLayout = dynamic(() => import('layouts/MainLayout'));

const Home = () => {
  const { t } = useTranslation();

  return <div>{t('Hello')}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookies = nookies.get({ req });
    const token = cookies.token;
    if (!token) throw new Error('No token');

    const { payloadObj }: { payloadObj: any } = decodeJWT(token);
    if (!payloadObj) throw new Error('Token parse error!');

    const user = await prisma.user.findUnique({
      where: {
        email: payloadObj.data.email,
      },
    });
    if (!user) throw new Error('User in token was not found!');

    const { id: _id, password: _password, ...returnUser } = user;
    return {
      props: {
        initialState: {
          users: {
            logined: true,
            ...returnUser,
          },
        },
      },
    };
  } catch (e) {
    console.log(e);
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
