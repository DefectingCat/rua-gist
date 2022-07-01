import Image from 'next/image';
import defaultAvatar from 'assets/images/login/user-avatar.svg';

const LoginButton = () => {
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="rounded-full  w-7">
            <Image src={defaultAvatar} alt="avatar" />
          </div>
        </label>

        <ul
          tabIndex={0}
          className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LoginButton;
