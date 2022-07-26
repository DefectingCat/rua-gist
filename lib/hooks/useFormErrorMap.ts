import useTranslation, { TranslationTarget } from './useTranslation';

export type FormErrorMapProps = {
  required?: TranslationTarget;
  pattern?: TranslationTarget;
  minLength?: TranslationTarget;
  maxLength?: TranslationTarget;
  validate?: TranslationTarget;
};

const defaultProps: Required<FormErrorMapProps> = {
  required: 'Value required',
  pattern: 'Not a valid email address',
  minLength: 'Minimum three characters',
  maxLength: 'Maximum twenty characters',
  validate: 'Password do not match',
};

const useFormErrorMap = (props?: FormErrorMapProps) => {
  const { t } = useTranslation();
  const { required, pattern, minLength, maxLength, validate } = {
    ...defaultProps,
    ...props,
  };

  return {
    required: t(required),
    pattern: t(pattern),
    minLength: t(minLength),
    maxLength: t(maxLength),
    validate: t(validate),
  };
};

export default useFormErrorMap;
