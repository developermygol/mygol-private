import React, { Component } from 'react';
import { getPlayerIdPicture } from '../../helpers/Utils';
import { Localize } from '../../common/Locale/Loc';
import { withRouter, Link } from 'react-router-dom';

class PlayerGridItem extends Component {
    getPlayerLink = (idPlayer, content) => {
        const p = this.props.match.params;
        const target = (p.idTournament && p.idTeam) ? 
            '/tournaments/' + p.idTournament + '/teams/' + p.idTeam + '/players/' + idPlayer
            :
            '/players/' + idPlayer;

        return <Link to={target}>{content}</Link>
    }

    render() {
        const p = this.props;
        const pl = p.player;

        return (
            <li key={pl.id} className='Item'>
                <div>{this.getPlayerLink(pl.id, getPlayerIdPicture(pl.idPhotoImgUrl, 'PlayerAvatar'))}</div>
                <div className='Name'>{this.getPlayerLink(pl.id, pl.name + ' ' + pl.surname)}</div>
                {pl.teamData ?
                    <div className='Position'>{Localize('FieldPosition' + (pl.teamData && pl.teamData.fieldPosition))}</div>
                    : null}

            </li>
        )
    }
}

export default withRouter(PlayerGridItem);