import dynamic from 'next/dynamic';

const DarkModeBtn = dynamic(() => import('components/DarkModeBtn'));
const LanguageChanger = dynamic(() => import('components/LanguageChanger'));

const HeadBar = () => {
  return (
    <>
      <div className="flex justify-between navbar bg-base-100">
        <a className="text-xl normal-case btn btn-ghost">daisyUI</a>

        <div>
          <DarkModeBtn />
          <LanguageChanger />
        </div>
      </div>
    </>
  );
};

export default HeadBar;
