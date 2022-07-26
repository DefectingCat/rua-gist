import data from 'assets/i18n/data.json';

type TranslationData = typeof data;

const t = (
  language: keyof TranslationData,
  target: keyof TranslationData['en-US']['translation']
) => {
  return data[language].translation[target];
};

export default t;
