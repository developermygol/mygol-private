import React, { Component } from 'react';
import Loc, { Localize } from '../Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { getSelectOptionsFromFixedValues } from '../FormsMobx/EditRenderHandlers';
import { parseJson, getInt } from '../../helpers/Utils';





@observer
class ClassificationCriteria extends Component {
    
    @observable value = this.props.field.value || '[0, 1, 2]';

    controls = [ null, null, null, null ];

    onChange = (e) => {
        const newValue = this.adaptControlToValue();

        this.value = newValue;
        this.props.field.onChange(newValue);
    }

    adaptValueToControl = (value) => {
        // '[0, 1, -1, -1]' to int array
        return parseJson(value);
    }

    adaptControlToValue = () => {
        var result = this.controls.map(c => { return getInt(c.value) });
        return JSON.stringify(result);
    }

    getControlForIndex = (i, value) => {
        var options = getSelectOptionsFromFixedValues('ClassificationCriteria', -1, 4);

        return (
            <div key={i} className='Option'>
                <small>{Localize('Caption.Criteria' + i)}</small>
                <select onChange={this.onChange} ref={c => this.controls[i] = c} value={value}>
                    {options.map(opt => (
                        <option
                            key={opt.value} 
                            value={opt.value}>
                            {this.props.localize ? Localize(opt.label) : opt.label}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    render()
    {
        const { field, hint } = this.props;
        const helper = [0, 1, 2, 3];
        const values = this.adaptValueToControl(this.value);

        return (
            <div className='FormField Criteria'>
                <label className='Label forText' htmlFor={field.id}>{field.label}</label>
                <small className='Hint'><Loc>{hint}</Loc></small>
                <div className='Selects'>
                    {helper.map(i => this.getControlForIndex(i, values[i]))}
                </div>
                <small className='ValidationError'>{field.error}</small>
            </div>                
        )
    }
}


export default ClassificationCriteria;