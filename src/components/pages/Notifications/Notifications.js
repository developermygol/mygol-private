import React, { Component } from 'react';
import MyNotifications from '../Home/MyNotifications';
import Loc from '../../common/Locale/Loc';

class Notifications extends Component {
    render() {
        return (
            <div>
                <h2><Loc>Notifications</Loc></h2>
                <MyNotifications />
            </div>
        )
    }
}

export default Notifications;