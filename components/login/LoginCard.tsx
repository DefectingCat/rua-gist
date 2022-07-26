import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  title: string | undefined;
  children?: ReactNode;
};

const LoginCard = ({ title, children }: Props) => {
  return (
    <>
      <div
        className={classNames(
          'p-8 shadow-xl w-full bg-base-100 card',
          'max-w-md'
        )}
      >
        <div className="pb-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>

        {children}
      </div>
    </>
  );
};

export default LoginCard;
