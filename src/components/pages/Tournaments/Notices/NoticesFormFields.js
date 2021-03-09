import React from 'react';

const NoticeFormFields = ({ type, name, label, hint, value, change }) => {
  switch (type.toLocaleLowerCase()) {
    case 'textarea':
      return (
        <div className="FormField">
          <label className="Label forText">{label}</label>
          <small className="Hint">{hint}</small>
          <textarea className="TextArea" name={name} value={value} onChange={change} />
          <small className="ValidationError"></small>
        </div>
      );

    default:
      return (
        <div className="FormField">
          <label className="Label forText">{label}</label>
          <small className="Hint">{hint}</small>
          <input
            className="Text"
            name={name}
            type="text"
            label={label}
            placeholder=""
            value={value}
            onChange={change}
          />
          <small className="ValidationError"></small>
        </div>
      );
  }
};

export default NoticeFormFields;
