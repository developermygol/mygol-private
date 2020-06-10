import React, { Component } from 'react';
import InfoBox from '../../../common/InfoBox';
import Grid from '../../../common/Grid';
import { getTeamLogo, getTeamLink } from '../../../helpers/Utils';
import Loc from '../../../common/Locale/Loc';

class TeamsGrid extends Component {
    render() {
        const p = this.props;
        const { teams, idTournament } = p;

        if (!teams) return <InfoBox><Loc>No teams. Need teams</Loc></InfoBox>

        return (
            <Grid className='Grid5' data={teams} renderer={
                team => (
                    <div className='TeamsGridItem'>
                        {getTeamLogo(idTournament, team.id, team.logoImgUrl)}
                        {getTeamLink(idTournament, team.id, team.name)}
                    </div>
                )
            } />
        )
    }
}

export default TeamsGrid;