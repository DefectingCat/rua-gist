import { useBoolean } from 'ahooks';
import FormInput from 'components/form/FormInput';
import PasswordInput from 'components/form/PasswordInput';
import useFormErrorMap from 'lib/hooks/useFormErrorMap';
import useTranslation from 'lib/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

const LoginLayout = dynamic(() => import('layouts/LoginLayout'));
const SubmitButton = dynamic(() => import('components/form/SubmitButton'));
const LoginCard = dynamic(() => import('components/login/LoginCard'));

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    mode: 'onChange',
  });

  const errorMap = useFormErrorMap();
  const [loading, loadingOp] = useBoolean(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      loadingOp.setTrue();
    } catch (e) {
    } finally {
      loadingOp.setFalse();
    }
  });

  return (
    <>
      <LoginCard title={t('Sign Up')}>
        <form onSubmit={onSubmit}>
          <FormInput
            id="username"
            name="username"
            label={t('Username')}
            placeholder={t('username')}
            register={register}
            rules={{
              required: true,
              minLength: 3,
              maxLength: 20,
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
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label={t('confirmPassword')}
            placeholder={t('confirmPassword')}
            register={register}
            rules={{
              required: true,
              validate: (v: string) => {
                if (watch('password') !== v) return '';
              },
            }}
            errors={errors}
            errorMap={errorMap}
            className="mt-3"
          />

          <SubmitButton loading={loading}>{t('Sign Up')}</SubmitButton>
        </form>
      </LoginCard>

      <div></div>
    </>
  );
};

SignUp.getLayout = (page: ReactElement) => {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignUp;
