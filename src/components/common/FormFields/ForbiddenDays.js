import React, { Component } from 'react';
import Loc, { Localize } from '../Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import IconButton from '../../../formFields/IconButton';
import XCircle from 'react-feather/dist/icons/x-circle';
import { getLongFormattedDate, removeTimeFromDate } from '../FormsMobx/Utils';
import { DatePicker } from './DatePicker';
import MessageBox from '../Dialogs/MessageBox';
import { toast } from 'react-toastify';



@observer
class ForbiddenDays extends Component {

    @observable data = this.props.field.value;
    @observable showAddDialog = false;

    getItemIndex = (item) => {
        for (let i = 0; i < this.data.length; ++i) {
            if (this.data[i] === item) return i;
        }

        return -1;
    }

    addDayHandler = () => {
        this.showAddDialog = true;
    }

    deleteDayHandler = (idx) => {
        this.data.splice(idx, 1);

        this.props.field.onChange(this.data.slice());
    }

    dayAddedHandler = (day) => {
        this.showAddDialog = false;
        if (!day) return;

        var d = day.toJSON();

        if (this.getItemIndex(d) !== -1) {
            toast.warn(Localize('Error.DayAlreadyExists'));
            return;
        }

        this.data.push(d);

        this.props.field.onChange(this.data.slice());
    }

    
    render() {
        const p = this.props;
        const { field, hint } = p;

        return (
            <div className='FormField'>
                <label className='Label'>{field.label}</label>
                <small className='Hint'><Loc>{hint}</Loc></small>

                <button className='Button Link' onClick={this.addDayHandler}><Loc>Add forbidden day</Loc></button>

                <table className='DataTable'>
                    <thead>
                        <tr className='DataTableHeaderRow'>
                            <th className='DataTableHeaderCell DataTableCell'><Loc>Day</Loc></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.data.map((dayString, i) => {
                            var d = new Date(dayString);
                            return (
                                <tr key={d.getTime()} className='DataTableRow'>
                                    <td className='DataTableCell'>{getLongFormattedDate(d)}</td>
                                    <td className='DataTableCell OneButton'><IconButton onClick={() => this.deleteDayHandler(i)} icon='delete' ><XCircle size={20}/></IconButton></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <small className='ValidationError'>{field.error}</small>

                <AddDayDialog show={this.showAddDialog} onClose={this.dayAddedHandler} initialDate={removeTimeFromDate(new Date())} />
            </div>
        )
    }
}

@observer
class AddDayDialog extends Component {

    @observable selected = this.props.initialDate;

    onChange = (date) => {
        this.selected = date;
    }

    onClose = (button) => {
        if (button !== 'Ok') {
            this.props.onClose(null);
            return;
        }

        this.props.onClose(this.selected);
    }

    render() {
        return (
            <MessageBox onClose={this.onClose} show={this.props.show} buttons='OkCancel'>
                <div className='DatePickerBottom'>
                    <DatePicker value={this.selected} onChange={this.onChange} showOverlay />
                </div>
            </MessageBox>
        )
    }
}



export default ForbiddenDays;