import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import Main from "./main";

const PageElement = ({ item, onAdd }) => {
  const params = useParams();
  useEffect(() => {
    localStorage.setItem("idItem", params.id);
  }, [item]);

  return (
    <Main item={item} onAdd={onAdd} />
  );
};

export default memo(PageElement);
