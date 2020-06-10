import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';
import List from '../../common/FormsMobx/List';
import { getUploadsImg } from '../../helpers/Utils';
import { Link, withRouter } from 'react-router-dom';
import { textLookup } from '../../common/FormsMobx/ListRenderHandlers';

class PlayerTeams extends Component {
    getPlayerTeamLink(idTeam, idTournament, teamName) {
        const { idPlayer } = this.props.match.params;
        return <Link to={'/tournaments/' + idTournament + '/teams/' + idTeam + '/players/' + idPlayer}>{teamName}</Link>;
    }

    getTournamentLink(tournament) {
        if (!tournament) return '--';
        return <Link to={'/tournaments/' + tournament.id}>{tournament.name}</Link>
    }
    
    render() {
        const p = this.props;
        const player = p.player;

        if (!player || !player.teams || player.teams.length === 0) return <Loc>Player.NoTeams</Loc>

        return (
            <List
                canAdd={false}
                canEdit={false}
                canDelete={false}
                listBackButton={false}
                listData={player.teams.slice()}
                loadingStatus='ready'
                fieldDefinition={[
                    { fieldName: 'logoImgUrl', localizedLabel: 'Logo', listRenderHandler: (t) => getUploadsImg(t.logoImgUrl, t.id, 'team', 'TeamLogo') },
                    { fieldName: 'name', localizedLabel: 'Team name', listRenderHandler: (t) => this.getPlayerTeamLink(t.id, t.tournament.id, t.name) },
                    { fieldName: 'tournament.name', localizedLabel: 'Tournament', listRenderHandler: (t) => this.getTournamentLink(t.tournament) },
                    { fieldName: 'teamData.apparelNumber', localizedLabel: 'ApparelNumber' },
                    { fieldName: 'teamData.fieldPosition', localizedLabel: 'FieldPosition', listRenderHandler: textLookup('FieldPosition', 'teamData.fieldPosition') },

                    //{ fieldName: 'teamData.fieldSide', localizedLabel: 'FieldSide', listRenderHandler: textLookup('FieldSide', 'teamData.fieldSide') },
                    //{ fieldName: '1', localizedLabel: 'Tournament' },
                    //{ fieldName: '2', localizedLabel: 'Season' },
                    // { fieldName: '4', localizedLabel: 'Points' },
                    // { fieldName: '5', localizedLabel: 'Cards' },
                    // { fieldName: '6', localizedLabel: 'Ranking MVP' },
                    // { fieldName: '7', localizedLabel: 'Ranking points' },
                ]}
            />
        )
    }
}

export default withRouter(PlayerTeams);