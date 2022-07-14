import useTranslation from 'lib/hooks/useTranslation';
import { checkLogin } from 'lib/pages/change-login';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

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
  const initialState = await checkLogin(req);

  return {
    props: {
      initialState,
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
