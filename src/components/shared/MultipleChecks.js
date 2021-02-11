import React from 'react';
import { v4 as uuidV4 } from 'uuid';

import Loc from '../common/Locale/Loc';

const MultipleChecks = ({ checks, label, hint, handleChange }) => {
  return (
    <div className="FormField Checkboxed">
      {label && (
        <label className="Label">
          <Loc>{label}</Loc>
        </label>
      )}
      {hint && (
        <small className="Hint">
          <Loc>{hint}</Loc>
        </small>
      )}
      <ul>
        {checks.map(check => (
          <li key={uuidV4()} style={{ cursor: 'pointer' }} onClick={() => handleChange(check)}>
            <span className={check.value ? 'FlagTrue' : 'FlagFalse'}>
              <Loc>{check.name}</Loc>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultipleChecks;
