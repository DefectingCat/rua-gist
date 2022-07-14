import { useBoolean } from 'ahooks';
import classNames from 'classnames';
import useTranslation from 'lib/hooks/useTranslation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { SigninProps } from './EmailInput';

const PasswrodInput = ({ register, errors, errorMap }: SigninProps) => {
  const { t } = useTranslation();
  const [showPass, showPassOp] = useBoolean(false);

  return (
    <>
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
    </>
  );
};

export default PasswrodInput;
