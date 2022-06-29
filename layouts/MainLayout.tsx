import dynamic from 'next/dynamic';

const HeadBar = dynamic(() => import('components/HeadBar'));

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <HeadBar />
      {children}
    </>
  );
};

export default MainLayout;
