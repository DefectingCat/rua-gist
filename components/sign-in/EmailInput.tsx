import classNames from 'classnames';
import useTranslation from 'lib/hooks/useTranslation';
import { SigninFormData } from 'pages/sign-in';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister
} from 'react-hook-form';

export type SigninProps = {
  register: UseFormRegister<SigninFormData>;
  errors: FieldErrorsImpl<DeepRequired<SigninFormData>>;
  errorMap: {
    required: string | undefined;
    pattern: string | undefined;
  };
};

const EmailInput = ({ register, errors, errorMap }: SigninProps) => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

export default EmailInput;
