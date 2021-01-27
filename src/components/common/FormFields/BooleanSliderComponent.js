import React from 'react';
import { observer } from 'mobx-react';

import Loc from '../Locale/Loc';
import Slider from '../../shared/Slider/Slider';

export default observer(({ field, hint, inputRef }) => {
  const nullOrEmpty = !field.value || field.value === '';

  return (
    <div className="FormField">
      <label className="Label forText" htmlFor={field.id}>
        {field.label}
      </label>
      <small className="Hint">
        <Loc>{hint}</Loc>
      </small>

      <Slider checked={nullOrEmpty ? false : field.value} onChange={e => field.onChange(e.target.checked)} />

      <small className="ValidationError">{field.error}</small>
    </div>
  );
});
