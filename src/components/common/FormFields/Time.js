import React, { Component } from 'react';
import Loc from '../Locale/Loc';
import { observer } from 'mobx-react';
import moment from 'moment';
import { observable } from 'mobx';

// function getPaddedValue(value) {
//     return (value < 10) ? '0' + value : value;
// }

function isValidTime(t) {
    return /^[0-9:]{0,5}$/.test(t);
}

// const isDefaultDate = (dateString) => {

// }

const dateStringToTimeString = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('H:mm');
}

const timeStringToDateString = (str) => {
    var d = moment(str, ['h:m a', 'H:m']);
    if (!d.isValid()) return null;

    const dd = d.year(1).month(0).date(1);
    const result = dd.format('YYYY-MM-DDTHH:mm:00');
    return result;
}

@observer
class Time extends Component {
    
    @observable value = dateStringToTimeString(this.props.field.value);

    onChange = (e) => {
        const val = e.target.value;

        if(!isValidTime(val)) return;

        this.value = val;

        this.props.field.onChange(timeStringToDateString(val));
    }

    render()
    {
        const { field, hint, type='text', inputRef} = this.props;

        return (
            <div className='FormField'>
                <label className='Label forText' htmlFor={field.id}>{field.label}</label>
                <small className='Hint'><Loc>{hint}</Loc></small>
                <input className='Text' {...field.bind()} onChange={this.onChange}  value={this.value} type={type} ref={inputRef} />
                <small className='ValidationError'>{field.error}</small>
            </div>                
        )
    }
}


export default Time;