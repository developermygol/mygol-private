import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';

class PlayerInviteStep3 extends Component {

    render() {
        const s = this.props.state;

        return (
            <div className=''>
                <p><Loc>Invite.For</Loc> {s.selectedItem.userData.name}</p>
                <p>{s.inviteText}</p>
            </div>
        )
    }
}

export default PlayerInviteStep3;