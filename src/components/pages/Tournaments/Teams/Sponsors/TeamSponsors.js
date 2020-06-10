import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Sponsors from '../../../Sponsors/Sponsors';

class TeamSponsors extends Component {
    render() {
        const p = this.props;
        const { idTeam } = p.match.params;

        return <Sponsors idTeam={idTeam} />
    }
}

export default withRouter(TeamSponsors);