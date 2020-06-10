    import React from 'react';
    import { observer } from 'mobx-react';
    import Loc from '../Locale/Loc';

    export default observer(({ field, hint, type='text', inputRef}) => (
        <div className='FormField'>
            <label className='Label forText' htmlFor={field.id}>{field.label}</label>
            <small className='Hint'><Loc>{hint}</Loc></small>
            <input className='Text' {...field.bind()} type={type} ref={inputRef} />
            <small className='ValidationError'>{field.error}</small>
        </div>
    ));