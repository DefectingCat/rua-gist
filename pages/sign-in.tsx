import classNames from 'classnames';
import useTranslation from 'lib/hooks/useTranslation';

const SignIn = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="p-8 shadow-xl w-96 bg-base-100 card">
        <form action="">
          <div>
            <label htmlFor="username">{t('Username')}</label>
            <input
              id="username"
              type="text"
              placeholder={t('username')}
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
    </>
  );
};

export default SignIn;
