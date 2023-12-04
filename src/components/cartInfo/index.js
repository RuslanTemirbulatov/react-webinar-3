import React from "react";
import './style.css';
import Controls from "../controls";
import { pluralize } from "../../utils";
import PropTypes from 'prop-types';


const CartInfo = ({cartOpen, fullPriceCart, countCart}) => {
  return (
    <div className="CartInfo">
      <h4>В корзине:</h4>
      {countCart !== 0 ? <h3>{`${countCart} ${pluralize('товар', 'товара', 'товаров', countCart)} / ${fullPriceCart.toLocaleString('ru-RU')}`} &#8381;</h3>
      : <h3>пусто</h3>}
      <Controls cartOpen={cartOpen} />
    </div>
  );
};


CartInfo.propTypes = {
  fullPriceCart: PropTypes.number,
  countCart: PropTypes.number,
  cartOpen: PropTypes.func
};

CartInfo.defaultProps = {
  cartOpen: () => {
  },
}

export default CartInfo;
