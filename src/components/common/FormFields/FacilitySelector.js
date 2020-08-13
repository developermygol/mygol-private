import React, { Component } from "react";
import Loc from "../Locale/Loc";
import Select from "react-select";
import { inject, observer } from "mobx-react";
import Spinner from "../Spinner/Spinner";

export const getSelectTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      text: "red",
      primary: "#43D2B4",
      primary75: "#43D2B4",
      primary50: "#43D2B4",
      primary25: "#43D2B4",
    },
  };
};

@inject("store")
@observer
class FacilitySelector extends Component {
  componentDidMount = () => {
    const fcs = this.props.store.facilities;
    fcs.loadOrGet();
  };

  adaptOptions = (storeFacilities) => {
    if (!storeFacilities) return [{ key: -1, label: "", value: -1 }];

    const result = storeFacilities.map((fac) => ({
      key: fac.id,
      label: fac.name,
      value: fac.id,
    }));

    const p = this.props;
    if (p.passProps && p.passProps.wantsEmptyRow)
      result.unshift({ key: 0, value: 0, label: "--" });

    return result;
  };

  adaptValue = (options, value) => {
    // value is [1, 2, 3]. Return [{value: 1, label...}, {value: 2, label...}, {value: 3, label...}]

    if (this.props.multiSelect)
      return options.filter((opt) => value.indexOf(opt.value) > -1);
    else return options.filter((opt) => opt.value === value);
  };

  onChange = (data) => {
    if (this.props.multiSelect) {
      const adapted = data.map((v) => v.value);
      this.props.field.onChange(adapted);
    } else {
      this.props.field.onChange(data.value);
    }
  };

  render() {
    const p = this.props;
    const fcs = this.props.store.facilities;
    const { field, hint } = p;
    const options = this.adaptOptions(fcs.all);

    return (
      <div className="FormField">
        <label className="Label forText" htmlFor={field.id}>
          {field.label}
        </label>
        <small className="Hint">
          <Loc>{hint}</Loc>
        </small>
        <Spinner loading={fcs.loading}>
          <Select
            {...field.bind()}
            onChange={this.onChange}
            value={this.adaptValue(options, field.value)}
            isMulti={p.multiSelect}
            options={options}
            closeMenuOnSelect={!p.multiSelect}
            theme={getSelectTheme}
          />
        </Spinner>
        <small className="ValidationError">{field.error}</small>
      </div>
    );
  }
}

export default FacilitySelector;
