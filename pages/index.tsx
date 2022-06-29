import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const MainLayout = dynamic(() => import('layouts/MainLayout'));

const Home = () => {
  return <div>Hello</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
