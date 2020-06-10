import React from 'react';
import { observer } from 'mobx-react';

export default observer( ({ field, hint }) => (
  <div className='FormField Separator'>
    <label className='Label'>{field.label}</label>
  </div>
));