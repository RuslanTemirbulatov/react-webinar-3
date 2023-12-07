import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { useLanguage } from "../../store/language-context";

const PageElement = ({ item, onAdd, onLoad }) => {
  const { language } = useLanguage();
  const params = useParams();
  const translations = require(`../../../lang/${language}.json`);

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
    onLoad: (e) => onLoad(item._id),
  };

  useEffect(() => {
    localStorage.setItem("idItem", params.id);
  }, [item]);

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
      <button onClick={callbacks.onAdd}>{translations.add}</button>
    </div>
  );
};

export default memo(PageElement);
