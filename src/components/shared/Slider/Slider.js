import React from 'react';

import './Slider.css';

const Slider = ({ onChange, label, checked }) => {
  return (
    <div className="Slider">
      <label className="switch">
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className="slider round"></span>
      </label>
      <label className="Label LeftMargin">{label}</label>
    </div>
  );
};

export default Slider;
