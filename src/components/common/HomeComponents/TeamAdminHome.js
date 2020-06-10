import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import PlayerHomeTeams from './PlayerHomeTeams';
import MyNotifications from '../../pages/Home/MyNotifications';
import { Link } from 'react-router-dom';
import Loc from '../Locale/Loc';

@inject('store', 'ui') @observer
class TeamAdminHome extends Component {

    @observable player = null;

    componentDidMount = () => {
        const p = this.props;
        p.store.players.getUser(p.ui.auth.idUser)
            .then(res => {
                this.player = res;
                if (!res) return;
                
                p.ui.auth.idPlayer = res.id;
            });
    }

    render() {
        return (
            <div className='CardContainer'>
    
                <img className='CardImg' src='/static/org/content/pl000002.jpg' alt='' />

                {/* Add a section with links to the mobile app store */}

                <div className='Card Hero'>
                    <h3><Loc>Teams</Loc></h3>
                    <div className='Content'>
                        <PlayerHomeTeams player={this.player} />
                    </div>
                </div>

                <div className='Card Hero'>
                    <h3><Loc>Pending notifications</Loc><Link className='Edit' to={'/notifications'}><Loc>See all notifications</Loc></Link></h3>
                    <div className='Content'>
                        <MyNotifications unreadOnly={true} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamAdminHome;