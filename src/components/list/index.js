import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";
import ItemCart from "../item-cart";

function List({ list, onActionItem, componentType }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {componentType === "itemCart" ? (
            <ItemCart item={item} onDeleteItem={onActionItem} />
          ) : (
            <Item item={item} onAddItemCart={onActionItem} />
          )}
        </div>
      )) 
      }
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onActionItem: PropTypes.func,
  componentType: PropTypes.string
};

List.defaultProps = {
  onActionItem: () => {},
};

export default React.memo(List);
