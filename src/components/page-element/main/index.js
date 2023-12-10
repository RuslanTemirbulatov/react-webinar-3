import React from "react";
import { useLanguage } from "../../../store/language-context";

const index = ({ item, onAdd }) => {
  const { language } = useLanguage();
  const translations = require(`../../../lang/${language}.json`);

  return (
    <div className="page-element container">
      <p>{item.description}</p>
      <p>
        {translations.country}:{" "}
        <span>
          {item.madeIn?.title} ({item.madeIn?.code}){" "}
        </span>
      </p>
      <p>
        {translations.category}: <span>{item.category?.title}</span>
      </p>
      <p>
        {translations.edition}: <span>{item.edition}</span>
      </p>
      <h2>
        {translations.price}: {item.price} ₽
      </h2>
      <button onClick={() => onAdd(item._id)}>{translations.add}</button>
    </div>
  );
};

export default index;
