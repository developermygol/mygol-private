import React, { Component } from 'react';
import Loc from '../Locale/Loc';
import MyNotifications from '../../pages/Home/MyNotifications';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PlayerHomeTeams from './PlayerHomeTeams';
import { observable } from 'mobx';

@inject('store', 'ui') @observer
class PlayerHome extends Component {

    @observable player = null;

    componentDidMount = () => {
        const p = this.props;
        p.store.players.getUser(p.ui.auth.idUser);
    }

    render() {
        return (
            <div className='CardContainer'>

                <img className='CardImg' src='/static/org/content/pl000002.jpg' alt='' />

                {/* Add a section with links to the mobile app store */}

                <div className='Card Hero'>
                    <h3><Loc>Teams</Loc></h3>
                    <div className='Content'>
                        <PlayerHomeTeams player={this.props.store.players.current} />
                    </div>
                </div>

                <div className='Card Hero'>
                    <h3><Loc>Pending notifications</Loc><Link className='Edit' to={'/notifications'}><Loc>See all notifications</Loc></Link></h3>
                    <div className='Content'>
                        <MyNotifications unreadOnly={true} />
                    </div>
                </div>

                {/* <div className='Card Hero'>
                    <h3><Loc>My profile</Loc></h3>
                    <div className='Content'>
                        <p><Loc>My profile.Content</Loc></p>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default PlayerHome;