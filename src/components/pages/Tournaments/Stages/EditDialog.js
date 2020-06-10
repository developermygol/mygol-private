import React, { Component } from 'react';
import BaseDialog from '../../../common/Dialogs/BaseDialog';


class EditDialog extends Component {
    render() {
        const p = this.props;
        return (
            <BaseDialog show={p.show}>
                {p.children}
            </BaseDialog>
        )
    }
}

export default EditDialog;