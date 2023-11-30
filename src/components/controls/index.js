import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({cartOpen}) {
  return (
    <div className='Controls'>
      <button onClick={cartOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cartOpen: PropTypes.func,
};

Controls.defaultProps = {
  cartOpen: () => {
  },
}


export default React.memo(Controls);
