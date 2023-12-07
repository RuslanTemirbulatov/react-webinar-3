import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { useLanguage } from "../../store/language-context";

function Head({ title }) {
  const { changeLanguage } = useLanguage();

  return (
    <div className="Head">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <button onClick={() => changeLanguage("ru")}>Русский</button>
        <button onClick={() => changeLanguage("en")}>English</button>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
