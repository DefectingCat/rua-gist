import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const DarkModeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  const setThemeWithClass = (theme: string) => {
    document.documentElement.className = theme;
    setTheme(theme);
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted)
    return (
      <a
        className="text-xl btn btn-ghost"
        onClick={() => setThemeWithClass('light')}
      >
        <div
          className={classNames(
            'w-5 h-5 rounded-md animate-pulse',
            'bg-gray-300 dark:bg-gray-500'
          )}
        ></div>
      </a>
    );

  return (
    <>
      {currentTheme === 'dark' ? (
        <a
          className="text-xl btn btn-ghost"
          onClick={() => setThemeWithClass('light')}
        >
          <FiSun className="w-5 h-5" />
        </a>
      ) : (
        <a
          className="text-xl btn btn-ghost"
          onClick={() => setThemeWithClass('dark')}
        >
          <FiMoon className="w-5 h-5" />
        </a>
      )}
    </>
  );
};

export default DarkModeBtn;
