import React from 'react';
import { Localize } from './Locale/Loc';

export default props => {
    const locMsg = props.localizedMessage ? Localize(props.localizedMessage) : null;
    const msg = locMsg || props.message || '';

    return <div className='ErrorBox'>
            <p>{msg}</p>
            { props.detail ? <p className='Details'>({props.detail})</p> : null }
        </div>
}