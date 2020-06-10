import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Sanctions from '../../Sanctions/Sanctions';
import Loc from '../../../common/Locale/Loc';

@inject('store') @observer
class TeamSanctions extends Component {
    getTournamentSanctions = () => {
        const p = this.props;
        const { idTournament, idTeam } = p.match.params;

        return p.store.sanctions.getAllForTeam(idTeam, idTournament);
    }
    
    render() {
        return (
            <Fragment>
                <h2><Loc>Sanctions</Loc></h2>
                <Sanctions getAllAction={this.getTournamentSanctions} canAdd={false} />
            </Fragment>
        )
    }
}

export default withRouter(TeamSanctions);