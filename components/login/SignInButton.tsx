import Avatar from 'boring-avatars';
import useTranslation from 'lib/hooks/useTranslation';
import Link from 'next/link';

const SignInButton = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-8 rounded-full">
            <Avatar
              size={32}
              name="Margaret Brent"
              variant="beam"
              colors={['#595643', '#4E6B66', '#ED834E', '#EBCC6E', '#EBE1C5']}
            />
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
