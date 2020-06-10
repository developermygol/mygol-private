import React, { Component } from 'react'
import Loc, { Localize } from '../Locale/Loc';
import { observer } from 'mobx-react';

@observer
class YesNo extends Component {

    handleChange = (event, optionData) => {
        const p = this.props;
        const v = event.target.value;
        p.field.onChange(v);
        if (optionData.onChange) optionData.onChange(v);
        if (p.onChange) p.onChange(v);
    };

    render() {
        const { field, hint, passProps, options } = this.props;
        
        const additionalClass = passProps ? passProps.additionalClass : '';
        const valueBaseClassName = (passProps && passProps.valueBaseClassName) || 'Value';

        const localize = passProps ? passProps.localize : false;

        return (
            <div className={'FormField ' + additionalClass}>
                <label className='Label'>{field.label}</label>
                <small className='Hint'><Loc>{hint}</Loc></small>
                
            </div>
        )
    }
}

YesNo.defaultProps = defaultProps

export default YesNo;