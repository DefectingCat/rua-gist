import { useBoolean } from 'ahooks';
import classNames from 'classnames';
import { login } from 'lib/api/login';
import useTranslation from 'lib/hooks/useTranslation';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

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
  const [showPass, showPassOp] = useBoolean(false);

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

            <div>
              <label htmlFor="passwrod">{t('Password')}</label>

              <div className="relative flex items-center mt-2 ">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder={t('password')}
                  className={classNames(
                    'w-full transition-all outline-none',
                    'input-bordered input',
                    'flex-1 pr-10'
                  )}
                  {...register('password', { required: true, maxLength: 30 })}
                />

                <div
                  className="absolute cursor-pointer right-3"
                  onClick={showPassOp.toggle}
                >
                  {showPass ? (
                    <AiFillEyeInvisible className="w-6 h-6" />
                  ) : (
                    <AiFillEye className="w-6 h-6" />
                  )}
                </div>
              </div>
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
