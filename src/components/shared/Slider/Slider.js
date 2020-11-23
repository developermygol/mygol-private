import React from 'react';

import './Slider.css';

const Slider = ({ onChange, label, checked, className }) => {
  return (
    <div className={`Slider ${className}`}>
      <label className="switch">
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className="slider round"></span>
      </label>
      <label className="Label LeftMargin">{label}</label>
    </div>
  );
};

export default Slider;
