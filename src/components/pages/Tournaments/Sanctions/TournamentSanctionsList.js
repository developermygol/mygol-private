import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Sanctions from '../../Sanctions/Sanctions';


@inject('store') @observer
class TournamentSanctionsList extends Component {
    getTournamentSanctions = () => {
        const p = this.props;
        const { idTournament } = p.match.params;

        return p.store.sanctions.getAllForTournament(idTournament);
    }

    render() {
        return (
            <Sanctions getAllAction={this.getTournamentSanctions} canAdd={false} />
        )
    }
}

export default withRouter(TournamentSanctionsList);