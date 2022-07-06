import { setLogined, setUserInfo } from 'app/features/user/userSlice';
import { useAppSelector } from 'app/hooks';
import { store } from 'app/store';
import { checkUser } from 'lib/api/login';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';
import AvatarLoading from './loading/AvatarLoading';

const DarkModeBtn = dynamic(() => import('components/DarkModeBtn'));
const LanguageChanger = dynamic(() => import('components/LanguageChanger'));
const LoginButton = dynamic(() => import('components/login/LoginButton'), {
  loading: () => <AvatarLoading />,
});
const SignInButton = dynamic(() => import('components/login/SignInButton'), {
  loading: () => <AvatarLoading />,
});

const menus = [];

const checkUserLogined = async () => {
  try {
    const result = await checkUser();
    if ('email' in result.data) {
      store.dispatch(setLogined());
      store.dispatch(setUserInfo(result.data));
    }
  } catch (e) {}
};

const HeadBar = () => {
  const { logined } = useAppSelector((state) => state.users);

  useEffect(() => {
    checkUserLogined();
  }, []);

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
