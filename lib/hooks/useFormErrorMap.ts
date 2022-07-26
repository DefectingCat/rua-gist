import useTranslation, { TranslationTarget } from './useTranslation';

export type FormErrorMapProps = {
  required?: TranslationTarget;
  pattern?: TranslationTarget;
};

const defaultProps: Required<FormErrorMapProps> = {
  required: 'Value required',
  pattern: 'Not a valid email address',
};

const useFormErrorMap = (props?: FormErrorMapProps) => {
  const { t } = useTranslation();
  const { required, pattern } = {
    ...defaultProps,
    ...props,
  };

  return {
    required: t(required),
    pattern: t(pattern),
  };
};

export default useFormErrorMap;
