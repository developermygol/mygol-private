import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';

class TournamentStatus extends Component {
    render() {
        const p = this.props;
        const { tournament } = p;

        if (!tournament) return null;

        return (
            <div>
                <h4><Loc>TournamentStatus</Loc></h4>
                <Loc>{'TournamentStatus' + tournament.status}</Loc>
            </div>
        )
    }
}

export default TournamentStatus;