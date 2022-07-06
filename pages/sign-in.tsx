import { useBoolean } from 'ahooks';
import { setLogined, setUserInfo } from 'app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames';
import { login } from 'lib/api/login';
import useTranslation from 'lib/hooks/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { logined } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (logined) router.back();
  }, []);

  const errorMap = {
    required: t('Value required'),
    pattern: t('Not a valid email address'),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const [loading, loadingOp] = useBoolean(false);
  const [showPass, showPassOp] = useBoolean(false);

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      loadingOp.setTrue();
      const result = await login(email, password);
      if (result.status === 'sucess') {
        router.push('/');
        dispatch(setLogined());
        if ('name' in result.data) dispatch(setUserInfo(result.data));
      }
    } catch (e) {
    } finally {
      loadingOp.setFalse();
    }
  });

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-bluish-gray dark:bg-gray-700">
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

                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder={t('email')}
                    className={classNames(
                      'w-full transition-all outline-none',
                      'input-bordered input',
                      errors.email?.type && 'input-error'
                    )}
                    {...register('email', {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    })}
                  />
                  <span
                    className={classNames(
                      'absolute right-0 top-[-55%]',
                      'text-error text-sm'
                    )}
                  >
                    {errors.email?.type &&
                      errorMap[errors.email.type as keyof typeof errorMap]}
                  </span>
                </div>
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
                      'flex-1 pr-10',
                      errors.password?.type && 'input-error'
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

                  <span
                    className={classNames(
                      'absolute right-0 top-[-55%]',
                      'text-error text-sm'
                    )}
                  >
                    {errors.password?.type &&
                      errorMap[errors.password.type as keyof typeof errorMap]}
                  </span>
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
      </div>
    </>
  );
};

export default SignIn;
