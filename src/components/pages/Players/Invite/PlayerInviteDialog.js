import React, { Component } from 'react';
import BaseDialog from '../../../common/Dialogs/BaseDialog';
import { observer } from 'mobx-react';
import PlayerInvite from './PlayerInvite';


@observer
class PlayerInviteDialog extends Component {
    

    render() {
        return (
            <BaseDialog onClose={this.props.onCancel} show={this.props.show} >
                <PlayerInvite
                    onCancel={this.props.onCancel}
                    onFinish={this.props.onFinish}
                />
            </BaseDialog>
        )
    }
}

PlayerInviteDialog.defaultProps = {
    onCancel: () => {},
    onFinish: () => {},
    show: false
}

export default PlayerInviteDialog;