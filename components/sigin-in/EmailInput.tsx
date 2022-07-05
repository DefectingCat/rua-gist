import classNames from 'classnames';
import useTranslation from 'lib/hooks/useTranslation';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldErrorsImpl, DeepRequired } from 'react-hook-form';

type Props = {
  showError: boolean;
  password: boolean;
  tips: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const EmailInput = ({ showError, password = false, tips, ...rest }: Props) => {
  const { t } = useTranslation();

  const errorMap = {
    required: t('Value required'),
    pattern: t('Not a valid email address'),
  };

  return (
    <>
      <div className="relative mt-2">
        <input
          type="text"
          placeholder={t('email')}
          className={classNames(
            'w-full transition-all outline-none',
            'input-bordered input',
            showError && 'input-error'
          )}
          {...rest}
        />
        <span
          className={classNames(
            'absolute right-0 top-[-55%]',
            'text-error text-sm'
          )}
        >
          {tips}
        </span>
      </div>
    </>
  );
};

export default EmailInput;
