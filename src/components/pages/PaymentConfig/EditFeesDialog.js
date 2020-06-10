import React, { Component } from 'react';
import Edit from '../../common/FormsMobx/Edit';

const fields = [
    { fieldName: 'fixedFee', localizedLabel: 'Payment.Fee.Fixed', hint: 'Payment.Fee.Fixed.Hint', editRenderType: 'text', rules: 'required|numeric' },
    { fieldName: 'variableFee', localizedLabel: 'Payment.Fee.Variable', hint: 'Payment.Fee.Variable.Hint', editRenderType: 'text', rules: 'required|numeric|between:0,100' },
]


class EditFeesDialog extends Component {
    render() {
        const p = this.props;

        return (
            <Edit
                editMessage={null}
                addMessage={null}
                isEditing={p.data ? true : false}
                saveButtonHandler={(data) => p.action(data, p.step)}
                backButton={true}
                data={p.data}
                onBackClick={() => p.action(null)}
                fieldDefinition={ fields }
            />
        )
    }
}

export default EditFeesDialog;