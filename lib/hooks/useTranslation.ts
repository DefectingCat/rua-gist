import { useRouter } from 'next/router';
import { useCallback } from 'react';
import data from 'assets/i18n/data.json';

type TranslationData = typeof data;

const useTranslation = () => {
  const router = useRouter();
  const { locale } = router;

  const t = useCallback(
    (target: keyof TranslationData['en-US']['translation']) => {
      if (!locale || !Object.keys(data).includes(locale)) return;
      return data[locale as keyof TranslationData].translation[target];
    },
    [locale]
  );

  return { t };
};

export default useTranslation;
