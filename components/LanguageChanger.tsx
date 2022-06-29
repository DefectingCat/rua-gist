import { useRouter } from 'next/router';
import i18nData from 'assets/i18n/i18n.json';
import Link from 'next/link';

type DataKey = keyof typeof i18nData;

const LanguageChanger = () => {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost rounded-btn">
          {locale ? i18nData[locale as DataKey] : ''}
        </label>
        <ul
          tabIndex={0}
          className="p-2 mt-4 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
          {Object.keys(i18nData).map((item) => (
            <li key={item}>
              <Link href={{ pathname, query }} as={asPath} locale={item}>
                <a>{i18nData[item as DataKey]}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LanguageChanger;
