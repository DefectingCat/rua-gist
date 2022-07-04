import classNames from 'classnames';
import useTranslation from 'lib/hooks/useTranslation';

const SignIn = () => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={classNames(
          'h-[100vh] flex items-center ',
          'md:justify-between container m-auto'
        )}
      >
        <div></div>

        <div
          className={classNames(
            'p-8 shadow-xl w-full bg-base-100 card',
            'max-w-md'
          )}
        >
          <div className="pb-6">
            <h1 className="text-2xl font-semibold">{t('Sign In')}</h1>
          </div>

          <form action="">
            <div>
              <label htmlFor="email">{t('Email')}</label>
              <input
                id="email"
                type="text"
                placeholder={t('email')}
                className={classNames(
                  'w-full transition-all outline-none',
                  'input-bordered input',
                  'mt-2'
                )}
              />
            </div>

            <div className="pt-6">
              <label htmlFor="passwrod">{t('Password')}</label>
              <input
                id="passwrod"
                type="text"
                placeholder={t('password')}
                className={classNames(
                  'w-full transition-all outline-none',
                  'input-bordered input',
                  'mt-2'
                )}
              />
            </div>

            <div className="mt-8">
              <button className="w-full btn">{t('login')}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
