import classNames from 'classnames';
import useFormErrorMap from 'lib/hooks/useFormErrorMap';
import useTranslation from 'lib/hooks/useTranslation';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

const LoginLayout = dynamic(() => import('layouts/LoginLayout'));

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  checkPassword: string;
};

const SignUp = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
  });

  const errorMap = useFormErrorMap();

  return (
    <>
      <div
        className={classNames(
          'p-8 shadow-xl w-full bg-base-100 card',
          'max-w-md'
        )}
      >
        <div className="pb-6">
          <h1 className="text-2xl font-semibold">{t('Sign Up')}</h1>
        </div>

        <form>
          <div>
            <label htmlFor="username">{t('Username')}</label>

            <div className="relative mt-2">
              <input
                type="text"
                placeholder={t('username')}
                className={classNames(
                  'w-full transition-all outline-none',
                  'input-bordered input'
                )}
              />
            </div>
          </div>
        </form>
      </div>

      <div></div>
    </>
  );
};

SignUp.getLayout = (page: ReactElement) => {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignUp;
