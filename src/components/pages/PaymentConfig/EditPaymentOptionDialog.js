import React, { Component } from 'react';
import Edit from '../../common/FormsMobx/Edit';

const fields = [
    { fieldName: 'title', localizedLabel: 'Payment.Option.Title', hint: 'Payment.Option.Title.Hint', editRenderType: 'text', rules: 'required|string|between:1,50' },
    { fieldName: 'description', localizedLabel: 'Payment.Option.Description', hint: 'Payment.Option.Description.Hint', editRenderType: 'text', rules: 'string' },
    { fieldName: 'price', localizedLabel: 'Payment.Option.Price', hint: 'Payment.Option.Price.Hint', editRenderType: 'text', rules: 'required|numeric' },
]


class EditPaymentOptionDialog extends Component {
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

export default EditPaymentOptionDialog;