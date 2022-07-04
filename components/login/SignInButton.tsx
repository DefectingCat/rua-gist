import Image from 'next/image';
import defaultAvatar from 'assets/images/login/user-avatar.svg';
import Link from 'next/link';
import useTranslation from 'lib/hooks/useTranslation';

const SignInButton = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="rounded-full w-7">
            <Image src={defaultAvatar} alt="avatar" />
          </div>
        </label>

        <ul
          tabIndex={0}
          className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href={'/sign-in'}>
              <a>{t('Sign In')}</a>
            </Link>
          </li>
          <li>
            <Link href={'/sign-up'}>
              <a>{t('Sign Up')}</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SignInButton;
