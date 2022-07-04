import { useAppSelector } from 'app/hooks';
import dynamic from 'next/dynamic';

const DarkModeBtn = dynamic(() => import('components/DarkModeBtn'));
const LanguageChanger = dynamic(() => import('components/LanguageChanger'));
const LoginButton = dynamic(() => import('components/login/LoginButton'));
const SignInButton = dynamic(() => import('components/login/SignInButton'));

const menus = [];

const HeadBar = () => {
  const { logined } = useAppSelector((state) => state.users);

  return (
    <>
      <div className="flex justify-between navbar bg-base-100">
        <a className="text-xl normal-case btn btn-ghost">daisyUI</a>

        <div>
          <DarkModeBtn />
          <LanguageChanger />
          {logined ? <LoginButton /> : <SignInButton />}
        </div>
      </div>
    </>
  );
};

export default HeadBar;
