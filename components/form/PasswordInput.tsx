import { useBoolean } from 'ahooks';
import FormInput, { FormInputProps } from 'components/form/FormInput';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type Props<T> = {} & FormInputProps<T>;

const PasswordInput = <T extends Record<string, unknown>>({
  ...rest
}: Props<T>) => {
  const [showPass, showPassOp] = useBoolean(false);

  return (
    <>
      <div className="relative">
        <FormInput type={showPass ? 'text' : 'password'} {...rest} />
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
    </>
  );
};

export default PasswordInput;
