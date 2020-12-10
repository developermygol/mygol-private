import React from 'react';
import { v4 as uuidV4 } from 'uuid';

import ColorPicker from '../../../formFields/ColorPicker';

const ColorPickerForm = ({ label, hint, value, onChange }) => (
  <div className="FormField Criteria">
    <label className="Label forText">{label}</label>
    <small className="Hint">{hint}</small>
    <ColorPicker key={uuidV4()} label={null} onChange={onChange} value={value} />
    <small className="ValidationError"></small>
  </div>
);

export default ColorPickerForm;
