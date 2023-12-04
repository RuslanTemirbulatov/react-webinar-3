import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function ItemCart(props) {
  const callbacks = {
    onDeleteItem: () => {
      props.onDeleteItem(props.item.code, props.item.title, props.item.price);
    },
  };

  return (
    <div className="ItemCart">
      <div className="ItemCart-code">{props.item.code}</div>
      <div className="ItemCart-title">{props.item.title}</div>
      <div className="ItemCart-price">
        <p>{props.item.price.toLocaleString('ru-RU')} ₽</p>
      </div>
        <div className="ItemCart-count">
          <h2 className="ItemCart-count__h2">{props.item.count} шт.</h2>
        </div>
      <div className="ItemCart-actions">
        <button onClick={callbacks.onDeleteItem}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

ItemCart.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(ItemCart);
