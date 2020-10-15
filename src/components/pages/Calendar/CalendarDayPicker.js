import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';

const CalendarDayPiker = ({ numberOfMonths, onChange, disabledDays, locale: lang }) => {
  const isOneMonth = numberOfMonths === 1;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const handleDayClick = (day, { selected }) => {
    const currentDay = selected ? undefined : day;
    setFrom(currentDay);
    onChange({ from: currentDay, to: undefined });
  };

  const handleDayRangeClick = date => {
    const currentRange = { from, to };
    const range = DateUtils.addDayToRange(date, currentRange);

    setFrom(range.from);
    setTo(range.to);
    onChange(range);
  };

  // const handleResetClick = () => {
  //   setFrom(undefined);
  //   setTo(undefined);
  // };

  const modifiers = { start: from, end: to };

  return (
    <div className="RangeExample">
      {isOneMonth ? (
        <DayPicker
          disabledDays={disabledDays}
          className="Simple"
          numberOfMonths={numberOfMonths}
          selectedDays={from}
          onDayClick={handleDayClick}
          localeUtils={MomentLocaleUtils}
          locale={lang}
        />
      ) : (
        <DayPicker
          className="Selectable"
          numberOfMonths={numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={handleDayRangeClick}
          localeUtils={MomentLocaleUtils}
          locale={lang}
        />
      )}
    </div>
  );
};

export default CalendarDayPiker;
