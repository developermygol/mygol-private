import React from 'react';
import { observer } from 'mobx-react';
import Loc from '../Locale/Loc';
import asyncComponent from '../AsyncComponent';

const AlloyEditorComponent = asyncComponent(() => import('./AlloyEditorComponent'));

export default observer(({ field, hint }) => (
  <div className='FormField'>
    <label className='Label forText' htmlFor={field.id}>{field.label}</label>
    <small className='Hint'><Loc>{hint}</Loc></small>
    <AlloyEditorComponent
      container='editableField1'
      alloyEditorConfig={{

      }}
      onChange={field.onChange}
      value={field.value}
    />
    
    <small className='ValidationError'>{field.error}</small>
  </div>
));




