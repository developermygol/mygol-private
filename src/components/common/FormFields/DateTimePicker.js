import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';

import Loc, { Localize } from '../Locale/Loc';

@inject('ui')
@observer
class DateTimePiker extends Component {
  state = {
    value: this.props.field.value,
    hours: null,
    minutes: null,
    timeValid: true,
  };

  handleChangeDayPicker = day => {
    const { hours, minutes } = this.state;
    if (hours && minutes) {
      day.setHours(hours);
      day.setMinutes(minutes);
    }
    debugger;
    this.setState({ value: day.toJSON() });
    this.props.field.value = day.toJSON();
  };

  handleTimeChange = e => {
    const value = e.target.value;
    if (!this.validateTime(value)) {
      this.setState({ timeValid: false });
      return;
    }

    const [hours, minutes] = value.split(':');
    const date = new Date(this.state.value);

    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    this.setState({
      value: date.toJSON(),
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
      timeValid: true,
    });
    this.props.field.value = date.toJSON();
  };

  validateTime = timeString => {
    const exp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeString.match(exp);
  };

  getTimeStringFromDateString = dateString => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${parseInt(hours, 10) < 10 ? `0${hours}` : hours}:${
      parseInt(minutes, 10) < 10 ? `0${minutes}` : minutes
    }`;
  };

  render() {
    const { field, hint, type = 'text', inputRef } = this.props;

    return (
      <div className="FormField">
        <label className="Label forText" htmlFor={field.id}>
          {field.label}
        </label>
        <small className="Hint">
          <Loc>{hint}</Loc>
        </small>
        <input
          style={{ display: 'none' }}
          className="Text"
          {...field.bind()}
          value={this.state.value}
          type={type}
          ref={inputRef}
        />
        <div className="DatTimeContainer">
          <DayPickerInput
            // value={this.state.value}
            placeholder={`${formatDate(new Date(this.props.field.value))}`}
            onDayChange={this.handleChangeDayPicker}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              locale: this.props.ui.lang,
              localeUtils: MomentLocaleUtils,
              months: Localize('months'),
              firstDayOfWeek: Localize('first weekday'),
              weekdaysShort: Localize('weekdays short'),
            }}
          />
          <input
            className={`Text Text-Time ${this.state.timeValid ? '' : 'Invalid'}`}
            type="text"
            name="time"
            defaultValue={this.getTimeStringFromDateString(this.state.value)}
            onChange={this.handleTimeChange}
          />
        </div>
        <small className="ValidationError">{field.error}</small>
      </div>
    );
  }
}

export default DateTimePiker;
