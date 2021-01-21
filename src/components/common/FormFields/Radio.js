import React, { Component } from 'react';
import Loc, { Localize } from '../Locale/Loc';
import { observer } from 'mobx-react';

const defaultProps = {
  options: [
    { label: 'No', value: 0 },
    { label: 'Yes', value: 1 },
  ],
};

@observer
class RadioComponent extends Component {
  handleChange = (event, optionData) => {
    const p = this.props;
    const v = event.target.value;
    p.field.onChange(v);
    if (optionData.onChange) optionData.onChange(v);
    if (p.onChange) p.onChange(v);
  };

  render() {
    const { field, hint, passProps, options } = this.props;

    const additionalClass = passProps ? passProps.additionalClass : '';
    const valueBaseClassName = (passProps && passProps.valueBaseClassName) || 'Value';

    const localize = passProps ? passProps.localize : false;

    return (
      <div className={'FormField ' + additionalClass}>
        <label className="Label">{field.label}</label>
        <small className="Hint">
          <Loc>{hint}</Loc>
        </small>
        <div className="RadioItems">
          {options && options.length > 0 ? (
            options.map(v => (
              <div className={'RadioItem ' + valueBaseClassName + v.value} key={v.value}>
                <label className={'RadioLabel'}>
                  <input
                    className={'Radio'}
                    // eslint-disable-next-line eqeqeq
                    checked={v.value == field.value}
                    type="radio"
                    value={v.value}
                    onChange={e => this.handleChange(e, v)}
                  />
                  <span className={'RadioContent'}>{localize ? Localize(v.label) : v.label}</span>
                </label>
              </div>
            ))
          ) : (
            <p className="">
              <Loc>{passProps && passProps.emptyOptionsMessage}</Loc>
            </p>
          )}
        </div>
      </div>
    );
  }
}

RadioComponent.defaultProps = defaultProps;

export default RadioComponent;
