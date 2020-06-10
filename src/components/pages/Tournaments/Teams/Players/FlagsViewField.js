import React from 'react';
import FlagsViewComponent from './FlagsViewComponent';


export default ( { field } ) => {
    return (
        <div className='FormField'>
            <label className='Label forText' htmlFor={field.id}><Loc>{field.label}</Loc></label>
            <FlagsViewComponent
                value={field.value}
                onChange={field.onChange}
            />   
            <small className='ValidationError'>{field.error}</small>
        </div>

    )
}