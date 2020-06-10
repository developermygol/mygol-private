import React, { Component, Fragment } from 'react';
import DayView from './DayView';
import { observer, inject } from 'mobx-react';
import Loc from '../../../common/Locale/Loc';
import { normalize } from '../../../helpers/Data';


@inject('store') @observer
export default class MatchList extends Component {
    render() {
        const p = this.props;
        const days = p.listData;
        if (!days) return null;

        const rawTeams = p.store.teams.all;
        if (!rawTeams) return null;

        const stages = p.store.stages.all;
        if (!stages) return null;

        const groups = p.store.groups.all;
        if (!groups) return null;

        

        const normalStages = normalize(stages);
        const normalTeams = normalize(rawTeams);
        const normalGroups = normalize(groups);
        
        const facilities = p.store.facilities.all;
        const normalFacilities = facilities ? normalize(facilities) : null;

        return (
            <Fragment>
                {p.canAdd ?
                    <div className='ActionBar'>
                        <button className='Button Active' onClick={p.addButtonHandler}>
                            <Loc>{p.addMessage}</Loc>
                        </button>
                    </div>
                    :
                    null
                }
                <div className='CalendarView'>
                    {days.map((day, i) => {
                        return <DayView
                            key={i}
                            value={day}
                            canEdit={false}
                            canDelete={false}
                            readOnly={true}
                            normalTeams={normalTeams}
                            normalGroups={normalGroups}
                            normalFacilities={p.showFacilities ? normalFacilities: null}
                            stage={normalStages[day.idStage]}
                        />
                    })}
                </div>
            </Fragment>
        )
    }
}