import { useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { useTranslation } from "react-i18next";

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  let isLangAr = lang === "ar";

  const changeLang = () => {
    if (isLangAr) {
      setLang("en");
      i18n.changeLanguage("en");
    } else {
      setLang("ar");
      i18n.changeLanguage("ar");
    }
  };

  return (
    <LanguageContext.Provider value={{lang, isLangAr, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
