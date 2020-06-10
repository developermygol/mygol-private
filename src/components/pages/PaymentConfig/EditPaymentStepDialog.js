import React, { Component } from 'react';
import Edit from '../../common/FormsMobx/Edit';

const fields = [
    { fieldName: 'title', localizedLabel: 'Payment.Step.Title', hint: 'Payment.Step.Title.Hint', editRenderType: 'text', rules: 'required|string|between:1,25' },
    { fieldName: 'description', localizedLabel: 'Payment.Step.Description', hint: 'Payment.Step.Description.Hint', editRenderType: 'text', rules: 'string' },
]


class EditPaymentStepDialog extends Component {
    render() {
        const p = this.props;

        return (
            <Edit
                editMessage={null}
                addMessage={null}
                isEditing={p.data ? true : false}
                saveButtonHandler={(data) => p.action(data)}
                backButton={true}
                data={p.data}
                onBackClick={() => p.action(null)}
                fieldDefinition={ fields }
            />
        )
    }
}

export default EditPaymentStepDialog;