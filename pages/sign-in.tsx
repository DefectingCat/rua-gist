import { useBoolean } from 'ahooks';
import { setLogined, setUserInfo } from 'app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames';
import FormInput from 'components/form/FormInput';
import { login } from 'lib/api/login';
import useFormErrorMap from 'lib/hooks/useFormErrorMap';
import useTranslation from 'lib/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginLayout = dynamic(() => import('layouts/LoginLayout'));
const SubmitButton = dynamic(() => import('components/form/SubmitButton'));

export type SigninFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { logined } = useAppSelector((state) => state.users);

  const errorMap = useFormErrorMap();
  const [showPass, showPassOp] = useBoolean(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (logined) router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <FormInput
            id="email"
            name="email"
            label={t('Email')}
            placeholder={t('email')}
            register={register}
            rules={{
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
            }}
            errors={errors}
            errorMap={errorMap}
          />

          <div className="relative">
            <FormInput
              id="password"
              name="password"
              label={t('Password')}
              placeholder={t('password')}
              register={register}
              rules={{ required: true, maxLength: 30 }}
              errors={errors}
              errorMap={errorMap}
              type={showPass ? 'text' : 'password'}
            />
            <div
              className="absolute cursor-pointer right-3 bottom-3"
              onClick={showPassOp.toggle}
            >
              {showPass ? (
                <AiFillEyeInvisible className="w-6 h-6" />
              ) : (
                <AiFillEye className="w-6 h-6" />
              )}
            </div>
          </div>

          <SubmitButton loading={loading}>{t('login')}</SubmitButton>
        </form>
      </div>
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignIn;
