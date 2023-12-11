import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { useLanguage } from "../../store/language-context";
import { Link } from "react-router-dom";

function ItemBasket(props) {
  const { language } = useLanguage();
  const translations = require(`../../lang/${language ?? "ru"}.json`);
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onOpenItem: (e) => {
      props.onOpenItem(props.item._id);
      props.onClose()
    },
  };
console.log(props);
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link
          className={cn("link")}
          to={props.item._id}
          onClick={callbacks.onOpenItem}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {translations.pieces}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{translations.delete}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
