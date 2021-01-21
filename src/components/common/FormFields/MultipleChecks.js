import React, { useState } from 'react';
import Loc from '../Locale/Loc';

const defaultValue = {
  notifyMatchResult: true,
  notifyMatchResultAllInGroup: false,
  notifyAward: true,
  notifySanction: true,
};

const onLoadValue = value => {
  const notDefined = !value || value === '' || !JSON.parse(value);
  if (notDefined) return defaultValue;
  return JSON.parse(value);
};

const MultipleChecks = ({ field, hint }) => {
  const [values, setValues] = useState(onLoadValue(field.value));
  const { notifyMatchResult, notifyMatchResultAllInGroup, notifyAward, notifySanction } = values;

  const handleChange = name => {
    const updatedValues = { ...values, [name]: !values[name] };
    setValues(updatedValues);
    field.value = JSON.stringify(updatedValues);
  };

  return (
    <div className="FormField Checkboxed">
      <label className="Label">{field.label}</label>
      <small className="Hint">
        <Loc>{hint}</Loc>
      </small>
      <ul>
        <li>
          <span
            className={notifyMatchResult ? 'FlagTrue' : 'FlagFalse'}
            onClick={() => handleChange('notifyMatchResult')}
          >
            <Loc>TN_MatchResult</Loc>
          </span>
        </li>
        <li>
          <span
            className={notifyMatchResultAllInGroup ? 'FlagTrue' : 'FlagFalse'}
            onClick={() => handleChange('notifyMatchResultAllInGroup')}
          >
            <Loc>TN_MatchResultAllInGroup</Loc>
          </span>
        </li>
        <li>
          <span
            className={notifyAward ? 'FlagTrue' : 'FlagFalse'}
            onClick={() => handleChange('notifyAward')}
          >
            <Loc>TN_Award</Loc>
          </span>
        </li>
        <li>
          <span
            className={notifySanction ? 'FlagTrue' : 'FlagFalse'}
            onClick={() => handleChange('notifySanction')}
          >
            <Loc>TN_Sanction</Loc>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MultipleChecks;
