import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LangSwitcherContext = createContext();

export function LangSwitcherProvider({ children }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLang = localStorage.getItem("language");
    return savedLang || i18n.language;
  });

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  useEffect(() => {
    if (currentLanguage && currentLanguage !== i18n.language) {
      i18n.changeLanguage(currentLanguage);
    }

    const validLanguages = ["vi", "en", "zh", "ko", "ja"];
    if (validLanguages.includes(currentLanguage)) {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage, i18n, navigate, changeLanguage]);

  return (
    <LangSwitcherContext.Provider
      value={{ currentLanguage, changeLanguage, t }}
    >
      {children}
    </LangSwitcherContext.Provider>
  );
}

export function useLangSwitcher() {
  return useContext(LangSwitcherContext);
}
