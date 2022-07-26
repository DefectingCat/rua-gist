import { useBoolean } from 'ahooks';
import { setLogined, setUserInfo } from 'app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import FormInput from 'components/form/FormInput';
import PasswordInput from 'components/form/PasswordInput';
import { login } from 'lib/api/login';
import useFormErrorMap from 'lib/hooks/useFormErrorMap';
import useTranslation from 'lib/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const LoginLayout = dynamic(() => import('layouts/LoginLayout'));
const SubmitButton = dynamic(() => import('components/form/SubmitButton'));
const LoginCard = dynamic(() => import('components/login/LoginCard'));

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
  const [loading, loadingOp] = useBoolean(false);

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

      <LoginCard title={t('Sign In')}>
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

          <PasswordInput
            id="password"
            name="password"
            label={t('Password')}
            placeholder={t('password')}
            register={register}
            rules={{ required: true, maxLength: 30 }}
            errors={errors}
            errorMap={errorMap}
            className="mt-3"
          />

          <SubmitButton loading={loading}>{t('login')}</SubmitButton>
        </form>
      </LoginCard>
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignIn;
