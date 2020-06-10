import React, { Component } from 'react';
import MessageBox from '../../../common/Dialogs/MessageBox';
import TeamSearch from './TeamSearch';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class AddTeamDialog extends Component {
    
    @observable selected = null;

    onClose = (button) => {
        const p = this.props;

        if (button === 'Ok') p.onClose(this.selected);

        p.onClose(null);
    }

    render() {
        return (
            <MessageBox onClose={this.onClose} show={this.props.show} buttons='OkCancel'>
                <TeamSearch onItemSelected={s => this.selected = s} />
            </MessageBox>
        )
    }
}

export default AddTeamDialog;