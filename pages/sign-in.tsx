import { useBoolean } from 'ahooks';
import { setLogined, setUserInfo } from 'app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames';
import { login } from 'lib/api/login';
import useTranslation from 'lib/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const EmailInput = dynamic(() => import('components/sign-in/EmailInput'));
const PasswrodInput = dynamic(() => import('components/sign-in/PasswrodInput'));
const SignInButton = dynamic(() => import('components/sign-in/SignInButton'));

export type SigninFormData = {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorMap = {
    required: t('Value required'),
    pattern: t('Not a valid email address'),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    mode: 'onChange',
  });

  const [loading, loadingOp] = useBoolean(false);

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      loadingOp.setTrue();
      const result = await login(email, password);
      if (result.status === 'success') {
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
              <EmailInput
                register={register}
                errors={errors}
                errorMap={errorMap}
              />

              <PasswrodInput
                register={register}
                errors={errors}
                errorMap={errorMap}
              />

              <SignInButton loading={loading} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
