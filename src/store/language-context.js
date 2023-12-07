// LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');
  const changeLanguage = (newLanguage) => {
    localStorage.setItem("currentLanguage", newLanguage)
    setLanguage(localStorage.getItem("currentLanguage"));
  };

  useEffect(() => {
    setLanguage(localStorage.getItem("currentLanguage"));
  }, [])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};