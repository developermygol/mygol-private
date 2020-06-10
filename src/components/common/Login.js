import React, { Component } from 'react';
import Loc from './Locale/Loc';
import { Redirect, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getUploadsImg } from '../helpers/Utils';

@inject('ui')
@observer
class Login extends Component {

    componentDidMount = () => {
        this.props.ui.auth.init();
    }

    handleLogout = () => {
        this.props.ui.auth.logout();
    }

    getLoginRoot = () => {
        return '/login';
    }

    loginRedirect = () => {
        return <Redirect to={this.getLoginRoot()} />;
    }

    getUserLevelCaption = (user) => {
        const key = (user.idUser >= 10000000) ? 'UserLevel5' : 'UserLevel' + user.level;

        return <Loc>{key}</Loc>;
    }

    render() {
        const user = this.props.ui.auth;
        const token = user ? user.token : null;

        // If not logged in, redirect to login screen.
        var path = (this.props.match) ? this.props.match.path : null;
        if ((!user || !token) && path && path !== this.getLoginRoot()) 
            return this.loginRedirect();

        // If logged in, show avatar and user
        return user ? ( 
            <div className="Account">
                <div className='UserData'>
                    <p className='UserName'>{user.name}</p>
                    <p className='UserRole'>{this.getUserLevelCaption(user)}</p>
                    <a href='' onClick={this.handleLogout}><Loc>Logout</Loc></a>
                </div>
                {getUploadsImg(user.avatarImgUrl, user.idUser, 'user', 'UserAvatar')}
            </div>
        ) : null 
    }
}

export default withRouter(Login);