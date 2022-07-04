import useTranslation from 'lib/hooks/useTranslation';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import nookies from 'nookies';
import { store } from 'app/store';

const MainLayout = dynamic(() => import('layouts/MainLayout'));

const Home = () => {
  const { t } = useTranslation();

  return <div>{t('Hello')}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = nookies.get({ req });
  const token = cookies.token;

  return {
    props: {},
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
