import { useBoolean } from 'ahooks';
import classNames from 'classnames';
import { login } from 'lib/api/login';
import useTranslation from 'lib/hooks/useTranslation';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, loadingOp] = useBoolean(false);

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      loadingOp.setTrue();
      const result = await login(email, password);
    } catch (e) {
    } finally {
      loadingOp.setFalse();
    }
  });

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

          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">{t('Email')}</label>
              <input
                type="text"
                placeholder={t('email')}
                className={classNames(
                  'w-full transition-all outline-none',
                  'input-bordered input',
                  'mt-2'
                )}
                {...register('email', {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                })}
              />
            </div>

            <div className="pt-6">
              <label htmlFor="passwrod">{t('Password')}</label>
              <input
                type="password"
                placeholder={t('password')}
                className={classNames(
                  'w-full transition-all outline-none',
                  'input-bordered input',
                  'mt-2'
                )}
                {...register('password', { required: true, maxLength: 30 })}
              />
            </div>

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
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
