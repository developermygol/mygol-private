import React, { Component } from 'react';
import PlayerSearch from '../../Players/PlayerSearch';
import { withRouter, Link } from 'react-router-dom';
import { redirect } from '../../../common/FormsMobx/Utils';
import Loc from '../../../common/Locale/Loc';
import { getUploadsImg } from '../../../helpers/Utils';


const PlayerSearchResult = ({ item, onClick, selected }) => {
    return (
        <tr className='PlayerSearchResultRow'>
            <td className='PlayerSearchResultAvatar'>
                {getUploadsImg(item.userData.avatarImgUrl, item.id, 'user', 'PlayerAvatar Mini')}
            </td>
            <td className='PlayerSearchResultName'>
                <Link to={'/players/' + item.id}>{item.name + ' ' + item.surname}</Link>
            </td>
        </tr>
    )
}

class TournamentPlayers extends Component {

    playerClickedHandler = (player) => {
        redirect(this, '/players/' + player.id);
    }

    render() {
        return (
            <div>
                <h2><Loc>Players</Loc></h2>
                <PlayerSearch onItemSelected={this.playerClickedHandler} itemTemplate={PlayerSearchResult} />
            </div>
        )
    }
}

export default withRouter(TournamentPlayers)