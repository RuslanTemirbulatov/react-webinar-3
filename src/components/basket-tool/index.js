import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { useLanguage } from '../../store/language-context';

function BasketTool({ sum, amount, onOpen, onPageChange }) {
  const { language } = useLanguage();
  const translations = require(`../../../lang/${language}.json`);
  const cn = bem("BasketTool");
  
  return (
    <div className={cn()}>
      <div className={cn("cart-controls")}>
        <span className={cn("label")}>{translations.inTheBasket}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${translations.product}`,
                few: `${translations.products1}`,
                many: `${translations.products2}`,
              })} / ${numberFormat(sum)} ₽`
            : `${translations.empty}`}
        </span>
        <button onClick={onOpen}>{translations.openCart}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
