import useTranslation from 'lib/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const MainLayout = dynamic(() => import('layouts/MainLayout'));

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto">
        <h1></h1>
        The way to explor good idea.
        <div>{t('Hello')}</div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
