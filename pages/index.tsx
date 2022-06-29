import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const MainLayout = dynamic(() => import('layouts/MainLayout'));

const Home = () => {
  const { t, i18n } = useTranslation();

  return <div>{t('Hello')}</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
