import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAddItemCart: (e) => {
      e.stopPropagation();
      props.onAddItemCart(props.item.code, props.item.title, props.item.price);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        <p>{props.item.price.toLocaleString('ru-RU')} ₽</p>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddItemCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAddCart: PropTypes.func,
};

Item.defaultProps = {
  onAddCart: () => {},
};

export default React.memo(Item);
