import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { getInt } from '../helpers/Utils';
import { isTeamInAdmins } from '../../RouteValidation';

export const Levels = Object.freeze({
    All: 0,
    Player: 1,
    Referee: 2, 
    TeamAdmin: 3, 
    OrgAdmin: 4
});


export function hasAccess(currentUserLevel, adminTeamIds, { allowAll, allowPlayer, allowReferee, allowTeamAdmin, allowOrgAdmin, match }) {
    switch (currentUserLevel) {
        case Levels.OrgAdmin: return true;
        case Levels.Referee: return allowPlayer || allowReferee;
        case Levels.Player: 
            if (isTeamInAdmins(match.params.idTeam, adminTeamIds))
                return allowTeamAdmin
            else 
                return allowPlayer;
        default: return false;
    }
}


@inject('ui') @observer
class AccessLimit extends Component {

    canRender = () => {
        const p = this.props;
        const {auth} = p.ui;
        if (!auth) return false;

        return hasAccess(getInt(auth.level), auth.adminTeamIds, p);
    }

    render() {
        return (
            this.canRender() ? this.props.children : null
        )
    }
}

export default withRouter(AccessLimit);