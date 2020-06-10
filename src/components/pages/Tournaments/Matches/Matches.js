import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Loc from '../../../common/Locale/Loc';
import Spinner from '../../../common/Spinner/Spinner';
import CalendarView from '../Calendar/CalendarView';
import { observe } from 'mobx';

@inject('store') @observer
class Matches extends Component {
    
    td = null;

    componentDidMount = () => {
        const p = this.props;
        const { idTournament } = p.match.params;

        this.td = observe(p.store.tournaments, "current", ({newValue}) => {
            if (newValue) { 
                p.store.matches.actions.getAll("/matches/fortournament/" + idTournament);
            }
        }, true);
    }

    componentWillUnmount = () => {
        if (this.td) this.td();
    }


    render() {
        const p = this.props;
        const { matches } = p.store;

        return (
            <Fragment>
                <h2><Loc>Calendar</Loc></h2>
                <Spinner loading={matches.all === null}>
                    <CalendarView value={matches.all} />
                </Spinner>
            </Fragment>
        )
    }
}

export default withRouter(Matches);