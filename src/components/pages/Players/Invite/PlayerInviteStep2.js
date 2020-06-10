import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Loc from '../../../common/Locale/Loc';

@observer
class PlayerInviteStep2 extends Component {

    @observable error = null;

    render() {
        const s = this.props.state;

        return (
            <div className='InviteStep'>
                <p><Loc>Invite.Message</Loc></p>
                <textarea className='TextArea Invite' value={s.inviteText} onChange={(e) => s.inviteText = e.target.value} />
                <p className='error'>{this.error}</p>
            </div>
        )
    }
}

export default PlayerInviteStep2;