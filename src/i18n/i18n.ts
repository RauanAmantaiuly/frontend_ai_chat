import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import kzCommon from "./locales/kz/common.json";
import ruCommon from "./locales/ru/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "kz"],
    ns: ["common"],
    defaultNS: "common",
    resources: {
      en: { common: enCommon },
      ru: { common: ruCommon },
      kz: { common: kzCommon },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
