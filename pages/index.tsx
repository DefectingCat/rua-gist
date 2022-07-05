import useTranslation from 'lib/hooks/useTranslation';
import { decodeJWT } from 'lib/utils/jwt-tools';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import nookies from 'nookies';
import { ReactElement } from 'react';

const MainLayout = dynamic(() => import('layouts/MainLayout'));

const Home = () => {
  const { t } = useTranslation();

  return <div>{t('Hello')}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = nookies.get({ req });
  const token = cookies.token;
  if (!token)
    return {
      props: {},
    };

  const { payloadObj }: { payloadObj: any } = decodeJWT(token);
  if (!payloadObj)
    return {
      props: {},
    };

  return {
    props: {
      initialState: {
        users: {
          logined: true,
          ...payloadObj.data,
        },
      },
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
