import React from 'react';
import { observer } from 'mobx-react';
import Loc from '../Locale/Loc';

export default observer( ({ field, hint }) => (
  <div className='FormField'>
    <label className='Label forText' htmlFor={field.id}>{field.label}</label>
    <small className='Hint'><Loc>{hint}</Loc></small>
    <textarea className='TextArea' {...field.bind()} />
    <small className='ValidationError'>{field.error}</small>
  </div>
));