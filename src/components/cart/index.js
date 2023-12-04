import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import List from "../list";

const Cart = ({ cartList, cartOpen, deleteCartItem, fullPriceCart }) => {
  return (
    <div className="Cart">
      <div className="Cart-header">
        <h1>Корзина</h1>
        <button onClick={cartOpen}>Закрыть</button>
      </div>
      <List
        list={cartList}
        onActionItem={deleteCartItem}
        componentType="itemCart"
      />
      {cartList.length > 0 ? (
        <div className="Cart-footer">
          <h3>Итого</h3>
          <h2>{fullPriceCart.toLocaleString("ru-RU")} &#8381;</h2>
        </div>
      ) : (
        <div className="Cart-footer__empty">
          <h2>В корзине ничего нет</h2>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      fullPriceCart: PropTypes.number,
    })
  ).isRequired,
  deleteCartItem: PropTypes.func,
  cartOpen: PropTypes.func,
  fullPriceCart: PropTypes.number
};

Cart.defaultProps = {
  deleteCartItem: () => {},
};

export default Cart;
