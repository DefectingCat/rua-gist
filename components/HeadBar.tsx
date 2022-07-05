import { useAppSelector } from 'app/hooks';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DarkModeBtn = dynamic(() => import('components/DarkModeBtn'));
const LanguageChanger = dynamic(() => import('components/LanguageChanger'));
const LoginButton = dynamic(() => import('components/login/LoginButton'));
const SignInButton = dynamic(() => import('components/login/SignInButton'));

const menus = [];

const HeadBar = () => {
  const { logined } = useAppSelector((state) => state.users);

  return (
    <>
      <div className="bg-base-100">
        <div className="container flex justify-between mx-auto navbar">
          <Link href="/">
            <a className="text-xl normal-case btn btn-ghost">RUA Gist</a>
          </Link>

          <div>
            <DarkModeBtn />
            <LanguageChanger />
            {logined ? <LoginButton /> : <SignInButton />}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadBar;
