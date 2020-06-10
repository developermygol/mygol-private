import React, { Component } from 'react';
import { getWeekDayIndices } from '../../../helpers/Dates';
import IconButton from '../../../../formFields/IconButton';
import XCircle from 'react-feather/dist/icons/x-circle';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { getUniqueInt } from '../../../helpers/Utils';

class SimpleSelect extends Component {

    handleChange = (event, value) => {
        this.props.onChange(event.target.value);
    };

    render() {
        return (
            <select
                {...this.props.passProps}
                onChange={this.handleChange}
                value={this.props.value}>
                {this.props.options.map(v => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                ))}
            </select>
        )
    }
}


class DailySlotComponent extends Component {

    state = {
        weekDay: this.props.weekDay,
        startTime: this.props.startTime,
        endTime: this.props.endTime,
        id: this.props.id
    }

    isValidTime = (t) => {
        return /^[0-9:]{0,5}$/.test(t);
        //return true;
    }

    handleStartTimeChange = (e) => {
        const val = e.target.value;
        if (!this.isValidTime(val)) return;
        const state = { ...this.state, startTime: val };
        this.setState(state);
        this.props.onChange(state);
    }

    handleEndTimeChange = (e) => {
        const val = e.target.value;
        if (!this.isValidTime(val)) return;
        const state = { ...this.state, endTime: val };
        this.setState(state);
        this.props.onChange(state);
    }

    handleWeekdayChange = (value) => {        
        const state = { ...this.state, weekDay: value };
        this.setState(state);
        this.props.onChange(state);
    }

    getWeekDays = () => {
        const days = Localize('weekdays long');
        const indices = getWeekDayIndices();
        const result = [];
        indices.forEach(wi => result.push({ value: wi, label: days[wi] }));

        return result;
    }

    render() {
        const weekDays = this.getWeekDays();
        return (
            <tr className='DataTableRow'>
                <td className='DataTableCell'><SimpleSelect passProps={{ className: '' }} options={weekDays} onChange={this.handleWeekdayChange} value={this.state.weekDay} /></td>
                <td className='DataTableCell'><input className='Text' type='text' onChange={this.handleStartTimeChange} value={this.state.startTime} /></td>
                <td className='DataTableCell'><input className='Text' type='text' onChange={this.handleEndTimeChange} value={this.state.endTime} /></td>
                <td className='DataTableCell'><IconButton onClick={() => this.props.deleteHandler(this.props.id)} icon='delete' ><XCircle size={20}/></IconButton></td>
            </tr>
        )
    }
}

// Create slots with unique keys. 
export const createDailySlot = (weekDay, startTime, endTime) => {
    return {
        weekDay, startTime, endTime, id: getUniqueInt()
    }
}

export default class WeekSlotsComponent extends Component {

    state = {
        slots: []
    }

    componentDidMount = () => {
        // Need to initialize the state here by not calling setState to avoid being 
        // hunted by the asynchonous setState not updating the whole form 
        // (if two form
        // fields launch onChange events fast enough, for instance at initialization
        // The Form state is a class with children items. Each time it receives onChange from
        // a different field, it will setState again on the whole object (not only the field value), 
        // by reading the previous this.state, that has not been updated due to setState is async. 
        this.setState({ slots: this.fromWeekDaysToSlots(this.props.field.value) })
    }

    fromWeekDaysToSlots = (weekDays) => {
        if (!weekDays) return [];
        
        // From this: [ [], [ { startTime: "", endTime: ""}, { startTime: "", endTime: "" } ], [], [], [], [], [] ]
        // To this { weekDay: 1, startTime: "18:00", endTime: "21:00" }
        const slots = []
        
        for (let i = 0; i < weekDays.length; ++i) {
            for (let sl = 0; sl < weekDays[i].length; ++sl) {
                let slot = weekDays[i][sl];
                slots.push(createDailySlot(i, slot.startTime, slot.endTime));
            }
        }

        return slots;
    }

    fromSlotsToWeekDays = (slots) => {
        // Have to transform: from a list of slots (with weekday, start and end times) 
        // to an array of arrays of slots for each weekday (with start and end times only)
        const result = [ [], [], [], [], [], [], [] ];

        slots.forEach((slot, i) => {
            result[slot.weekDay].push( { startTime: slot.startTime, endTime: slot.endTime });
        })

        return result;
    }

    notifyChange = (slots) => {
        this.setState({ slots });
        this.props.field.onChange(this.fromSlotsToWeekDays(slots));
    }

    slotDeleted = (index) => {
        const slots = this.state.slots.filter( (s, i) => i !== index);
        this.notifyChange(slots);
    }

    slotChanged = (index, newValue) => {
        // create a new slots array with the updated slot
        const slots = this.state.slots.map( (s, i) => (i === index) ? newValue : s)
        this.notifyChange(slots);
    }

    slotAdded = (slot) => {
        const slots = this.state.slots.concat(slot);
        this.notifyChange(slots);
    }

    render() {
        const { field, hint } = this.props;

        return (            
            <div className='FormField'>
                <label className='Label forText' htmlFor={field.id}>{field.label}</label>
                <small className='Hint'><Loc>{hint}</Loc></small>
                <button className='Button Link AddButton' onClick={() => this.slotAdded(createDailySlot(1, "8:00", "21:00"))}><Loc>AddNewSlot</Loc></button>
                <table className='DataTable'>
                    <thead>
                        <tr className='DataTableHeaderRow'>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>WeekDay</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>SlotStart</Loc></th>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>SlotEnd</Loc></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.slots.map((s, i) => {
                            return <DailySlotComponent 
                                        key={s.id} {...s} 
                                        onChange={(slot) => this.slotChanged(i, slot)} 
                                        deleteHandler={() => this.slotDeleted(i)} />
                        })}
                    </tbody>
                </table>
                <small className='ValidationError'>{field.error}</small>
            </div>
        )
    }
}