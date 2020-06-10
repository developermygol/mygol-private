import React from 'react';
import Loc from './Locale/Loc';

export default props => {
    return (
        <li className='ShowField'>
            <span className='Field'><Loc>{props.label}</Loc>:</span> <span className='Value'>{props.value}</span>
        </li>
    )
}