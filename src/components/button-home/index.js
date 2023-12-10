import React from "react";
import { useLanguage } from "../../store/language-context";
import { Link } from "react-router-dom"
import './style.css'


const ButtonMain = ({ onPageChange }) => {
  const { language } = useLanguage();
  const translations = require(`../../../lang/${language}.json`);

  return (
    <div className="button-main">
      <Link to="/" onClick={() => onPageChange(1)} className="button-main__link">
        {translations.main}
      </Link>
    </div>
  );
};

export default ButtonMain;
