import classNames from 'classnames';
import useTranslation from 'lib/hooks/useTranslation';
import { ReactNode } from 'react';

type Props = {
  loading: boolean;
  children?: ReactNode;
};

const SignInButton = ({ loading, children }: Props) => {
  return (
    <>
      <div className="mt-8">
        <button
          className={classNames(
            'w-full btn transition-all',
            loading && 'loading'
          )}
        >
          {children}
        </button>
      </div>
    </>
  );
};

export default SignInButton;
