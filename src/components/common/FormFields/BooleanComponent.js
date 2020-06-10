import React from 'react';
import { observer } from 'mobx-react';
import Loc from '../Locale/Loc';
import YesNoPicker from './YesNoPicker';

export default observer(({ field, hint, inputRef}) => (
    <div className='FormField'>
        <label className='Label forText' htmlFor={field.id}>{field.label}</label>
        <small className='Hint'><Loc>{hint}</Loc></small>
        
        <YesNoPicker value={field.value} onChange={field.onChange} />

        <small className='ValidationError'>{field.error}</small>
    </div>
));