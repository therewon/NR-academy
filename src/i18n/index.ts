import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import az from './locales/az.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

const savedLang = localStorage.getItem('nr_lang') || 'az';

i18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: 'az',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
