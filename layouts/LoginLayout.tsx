import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-bluish-gray dark:bg-gray-700">
        <div
          className={classNames(
            'h-[100vh] flex items-center ',
            'md:justify-between container m-auto'
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default LoginLayout;
