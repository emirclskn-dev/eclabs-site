import en from './en.json';
import tr from './tr.json';

const translations = { en, tr };

export const getTranslations = (lang) => translations[lang] || translations.en;
