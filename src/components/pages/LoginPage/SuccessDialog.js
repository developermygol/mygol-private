import React, { Component } from 'react';
import MessageBox from '../../common/Dialogs/MessageBox';
import Loc from '../../common/Locale/Loc';

class SuccessDialog extends Component {
    render() {
        const p = this.props;
        return (
            <MessageBox onClose={p.onClose} buttons='Ok' show>
                <p className='AnimatedTick'></p>
                <p><Loc>{p.lMsg}</Loc></p>
            </MessageBox>
        )
    }
}

export default SuccessDialog;