import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Sanctions from '../../../Sanctions/Sanctions';

@inject('store') @observer
class PlayerSanctions extends Component {
    // getTournamentSanctions = () => {
    //     const p = this.props;
    //     const { idPlayer } = p.match.params;

    //     return p.store.sanctions.getAllForPlayer(idPlayer);
    // }
    
    render() {
        return (
            <Sanctions sanctions={this.props.sanctions} canAdd={false} />
        )
    }
}

export default withRouter(PlayerSanctions);