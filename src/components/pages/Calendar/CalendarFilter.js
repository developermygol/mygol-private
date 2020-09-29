import React from 'react';
import Select from 'react-select';

// import Loc from '../../common/Locale/Loc';

const CalendarFilter = props => {
  const { name, options, defaultValue, onChange, label, className } = props;

  return (
    <div key={name} className="CalendarFilter">
      {label && <label className="Label">{label}</label>}
      <Select
        name={name}
        options={options}
        defaultValue={defaultValue ? defaultValue : null}
        onChange={data => onChange(data, name)}
        className={className ? className : 'Select'}
      />
    </div>
  );
};

export default CalendarFilter;
