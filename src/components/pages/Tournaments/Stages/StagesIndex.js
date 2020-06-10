import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Stages from './Stages';
import GroupCalendar from './Calendar/GroupCalendar';
import Loc from '../../../common/Locale/Loc';


class StagesIndex extends Component {
    render() {
        const basePath = this.props.match.path;

        return (
            <div>
                <h2><Loc>Stages and groups</Loc></h2>
                <Switch>
                    <Route path={basePath + '/calendar/:idGroup'} component={GroupCalendar} />
                    <Route path={basePath} exact component={Stages} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(StagesIndex);