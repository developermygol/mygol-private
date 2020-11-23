import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import '../../shared/Slider/Slider.css';

@observer
class YesNoPickerSlider extends Component {
  // = ({ onChange, label, checked, className }) => {
  @observable value = this.adaptValue(this.props.value);

  adaptValue = v => {
    if (v === 'true') return true;
    if (v === 'false') return false;

    return v;
  };

  @action onClick = (v, e) => {
    e.preventDefault();
    this.value = v;
    const p = this.props;
    if (p.onChange) p.onChange(v);
  };

  render() {
    return (
      <div className={`Slider ${this.props.className}`}>
        <label className="switch">
          <input type="checkbox" onChange={e => this.onClick(e.target.checked, e)} checked={this.value} />
          <span className="slider round"></span>
        </label>
        <label className="Label LeftMargin">{this.props.label}</label>
      </div>
    );
  }
}

export default YesNoPickerSlider;
