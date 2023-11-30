import React from "react";
import "./style.css";
import Item from "../item";
import PropTypes from 'prop-types';

const Cart = ({
  cartList,
  cartOpen,
  deleteCartItem,
  fullPriceCart,
  activeModal
}) => {
  return (
    <div className="Cart">
      <div className="Cart-header">
        <h1>Корзина</h1>
        <button onClick={cartOpen}>Закрыть</button>
      </div>
      {cartList.map((item) => (
        <div key={item.code} className="Cart-item">
          <Item
            buttonText={'Удалить'}
            item={item}
            onItemAction={deleteCartItem}
            activeModal={activeModal}
          />
        </div>
      ))}

      {cartList.length > 0 ? (
        <div className="Cart-footer">
          <h3>Итого</h3>
          <h2>{fullPriceCart} &#8381;</h2>
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
  cartList: PropTypes.arrayOf(PropTypes.shape({
    fullPriceCart: PropTypes.number,
  })).isRequired,
  deleteCartItem: PropTypes.func,
  cartOpen: PropTypes.func
};

Cart.defaultProps = {
  deleteCartItem: () => {},
};

export default Cart;
