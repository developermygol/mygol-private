import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import { observer, inject } from 'mobx-react';
import { Localize } from '../Locale/Loc';


@inject('ui') @observer
export class DatePicker extends Component {
    render() {
        const p = this.props;

        return (
            <DayPickerInput
                    inputProps={ {className: 'Text'} }
                    value={p.value}
                    showOverlay={p.showOverlay}
                    placeholder={Localize('shortDateFormat')}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    format={Localize('moment dateformat')}
                    onDayChange={p.onChange}
                    dayPickerProps={{
                        locale: this.props.ui.lang,
                        months: Localize('months'),
                        firstDayOfWeek: Localize('first weekday'),
                        weekdaysShort: Localize('weekdays short')
                      }}
                />
        )
    }
}


@observer
class DatePickerComponent extends Component {

    render() {
        const { field } = this.props;
        
        let date = new Date(1, 1, 1995);
        if (field.value) date = new Date(field.value);
        if (isNaN(date.getTime())) date = '';

        if (date.getFullYear() === 1) date.setFullYear(1995);

        return (
            <div className='FormField'>
                <label className='Label'>{field.label}</label>
                <DatePicker value={date} onChange={field.onChange} />
            </div>
            
        )
    }
}

export default DatePickerComponent;