import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LangSwitcherContext = createContext();

export function LangSwitcherProvider({ children }) {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
    navigate(`/${newLang}${window.location.pathname.substring(3)}`);
  };

  useEffect(() => {
    if (lang && lang !== currentLanguage) {
      changeLanguage(lang);
    }

    const validLanguages = ["vi", "en", "zh", "ko", "ja"];
    if (validLanguages.includes(currentLanguage)) {
      document.documentElement.lang = currentLanguage;
    }
  }, [lang, currentLanguage, navigate, changeLanguage]);

  return (
    <LangSwitcherContext.Provider
      value={{ currentLanguage, changeLanguage, t, lang }}
    >
      {children}
    </LangSwitcherContext.Provider>
  );
}

export function useLangSwitcher() {
  return useContext(LangSwitcherContext);
}
