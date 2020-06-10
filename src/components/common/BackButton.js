import React from 'react';
import Loc from './Locale/Loc';
import { withRouter } from 'react-router-dom';
import ArrowLeft from 'react-feather/dist/icons/arrow-left';

export default withRouter(props => (
    <button 
        className='Button' 
        onClick={() => {
                if (props.onClick)
                    props.onClick();
                else
                    props.history.goBack();
            } 
        }
    >
        <ArrowLeft size={16}/><Loc>Back</Loc>
    </button>
));