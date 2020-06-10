import React, { Component, Fragment } from 'react';
import Spinner from '../../../common/Spinner/Spinner';
import ErrorBox from '../../../common/ErrorBox';
import Loc, { Localize } from '../../../common/Locale/Loc';
import WeekSlotsComponent from './WeekSlotsComponent';
import SortableTeamsField from './SortableTeamsField';
import MatchList from './MatchList';
import axios from '../../../../axios';
import { observer, inject } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

import DatePickerComponent from '../../../common/FormFields/DatePicker';
import Text from '../../../common/FormFields/Text';
import { observable, action } from 'mobx';
import { requestAsync } from '../../../helpers/Utils';
import { hasCalendarFlagMask } from '../Stages/Calendar/GroupCalendar';
import { withRouter } from 'react-router-dom';
import FacilitySelector from '../../../common/FormFields/FacilitySelector';
import CalendarMessages from './CalendarMessages';
import ForbiddenDays from '../../../common/FormFields/ForbiddenDays';

@inject('store') @observer
class CalendarSetup extends Component {

    @observable loading = false;
    @observable error = null;
    @observable canSave = false;
    @observable calendarData = null;

    constructor() {
        super();

        this.form = new MobxReactForm({
            fields: [
                { name: 'startDate', label: Localize('Start date'), value: new Date() },
                { name: 'weekdaySlots', label: Localize('Available slots'),  value: [ [], [ { startTime: "12:00", endTime: "21:00" } ], [], [], [], [], [] ]},
                { name: 'gameDuration', label: Localize('Game duration'), hint: 'In minutes', rules: 'required|integer', value: 60 },
                { name: 'teamIds', label: Localize('Teams') },
                { name: 'fieldIds', label: Localize('Fields'), value: [] },
                { name: 'forbiddenDays', label: Localize('Forbidden days'), value: [] }
            ]
        }, 
        { 
            plugins: { dvr: validatorjs }, 
            hooks: { }
        });
    }

    adaptFacilities = (values) => {
        return values.map(fac => fac.value);
    }

    @action requestCalendar = (preview) => {
        this.error = null;
        this.calendarData = null;

        const p = this.props;
        const setupData = this.form.values();
        setupData.numRounds = p.group.numRounds;
        setupData.type = p.stage.type;
        setupData.group = {
            idTournament: p.group.idTournament,
            idStage: p.group.idStage,
            idGroup: p.group.id
        };
        setupData.isPreview = preview;

        // Perform request to the server with the setup data.
        requestAsync(this, axios.post, null, '/calendar/generate', setupData)
            .then(res => {
                if (!res) return;   // Error

                this.calendarData = res;
                this.canSave = preview;
                if (preview) return;

                // Update group record in store so it displays new calendar instead of the calendar setup
                p.group.flags = p.group.flags | hasCalendarFlagMask;
                p.store.matches.all = res.days;
            });
    }

    handlePreview = (e) => {
        this.requestCalendar(true);
        return false;
    }

    handleSave = (e) => {
        this.requestCalendar(false);
    }

    getPreview = () => {
        const data = this.calendarData;
        if (!data || !data.days) return null;

        return (
            <div className='TabSection'>
                <h3><Loc>Preview</Loc></h3>
                <CalendarMessages data={data.messages} />
                <MatchList listData={data.days} idTournament={this.props.idTournament} readOnly={true} showFacilities />
            </div>
        )
    }
   

    render() {
        const p = this.props;
        const F = this.form;

        return (
            <Fragment>
                <div className='TabSection'>
                    <form onSubmit={F.onSubmit} >
                        <DatePickerComponent field={F.$('startDate')} />
                        <WeekSlotsComponent field={F.$('weekdaySlots')} hint='Slots.Hint' />
                        <ForbiddenDays field={F.$('forbiddenDays')} hint='Forbidden days.Hint' />
                        <FacilitySelector field={F.$('fieldIds')} hint='Fields.Hint' multiSelect />
                        <Text field={F.$('gameDuration')} />
                        <SortableTeamsField isLeague={p.stage.type === 1} field={F.$('teamIds')} group={this.props.group} />
                    </form>

                    <button className='Button' onClick={ this.handlePreview }><Loc>Preview</Loc></button>
                    {this.canSave? <button className='Button Active' onClick={ this.handleSave }><Loc>Save</Loc></button> : null}
                </div>
                <Spinner loading={this.loading}>
                    {this.error ? <ErrorBox localizedMessage='Error.Loading' detail={this.error} /> : null }
                    {this.getPreview()}
                </Spinner>
            </Fragment>
        )
    }
}

export default withRouter(CalendarSetup);