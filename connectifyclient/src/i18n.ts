import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import enWorkSpace from './locales/en/workspace.json';
import ruCommon from './locales/ru/common.json';
import ruWorkSpace from './locales/ru/workspace.json';

export const defaultNS = "common";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'ru',
  resources: {
    en: {
        common: enCommon,
        workspace: enWorkSpace,
    },
    ru: {
        common: ruCommon,
        workspace: ruWorkSpace,
    },
  },
});

export default i18next;
