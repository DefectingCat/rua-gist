import classNames from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import {
  DeepRequired,
  FieldErrorsImpl,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type ErrorMap = {
  [key in keyof RegisterOptions]: string | undefined;
};

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  label: string | undefined;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors: FieldErrorsImpl<DeepRequired<TFormValues>>;
  errorMap: ErrorMap;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  label,
  rules,
  errors,
  register,
  errorMap,
  ...rest
}: FormInputProps<TFormValues>) => {
  return (
    <>
      <div>
        <label htmlFor={name}>{label}</label>

        <div className="relative mt-2">
          <input
            className={classNames(
              'w-full transition-all outline-none',
              'input-bordered input',
              errors[name]?.type && 'input-error',
              rest.className
            )}
            {...rest}
            {...(register && register(name, rules))}
          />

          <span
            className={classNames(
              'absolute right-0 top-[-55%]',
              'text-error text-sm'
            )}
          >
            {errors[name]?.type &&
              errorMap[errors[name]?.type as keyof typeof errorMap]}
          </span>
        </div>
      </div>
    </>
  );
};

export default FormInput;
