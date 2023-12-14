import React, {memo}  from "react";
import PropTypes from 'prop-types';
import './style.css';

function FilterSelect(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  const renderSelectOptions = (category, level = 0) => {
    return (
      <React.Fragment key={category._id}>
        <option value={category._id}>{`${'-'.repeat(level)} ${category.title}`}</option>
        {category.subcategories && category.subcategories.map(subcategory => renderSelectOptions(subcategory, level + 1))}
      </React.Fragment>
    );
  };
  return (
    <select className="Select" value={props.value} onChange={onSelect}>
        <option value="">Все</option>
        {props.options.map(category => renderSelectOptions(category))}
    </select>
  )
}

FilterSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

FilterSelect.defaultProps = {
  onChange: () => {
  }
}

export default memo(FilterSelect);