import Image from 'next/image';
import defaultAvatar from 'assets/images/login/user-avatar.svg';
import { useCallback } from 'react';
import { logout } from 'lib/api/login';
import { useRouter } from 'next/router';
import { VscLoading } from 'react-icons/vsc';
import { useBoolean } from 'ahooks';

const LoginButton = () => {
  const router = useRouter();

  const [loading, loadingOp] = useBoolean(false);
  const handleLogout = useCallback(async () => {
    try {
      loadingOp.setTrue();
      await logout();
      router.reload();
    } catch (e) {
    } finally {
      loadingOp.setFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a onClick={handleLogout}>
              {loading && (
                <VscLoading className="transition-all animate-spin" />
              )}
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LoginButton;
