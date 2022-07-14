import classNames from 'classnames';
import useTranslation from 'lib/hooks/useTranslation';

type Props = {
  loading: boolean;
};

const SignInButton = ({ loading }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-8">
        <button
          className={classNames(
            'w-full btn transition-all',
            loading && 'loading'
          )}
        >
          {t('login')}
        </button>
      </div>
    </>
  );
};

export default SignInButton;
