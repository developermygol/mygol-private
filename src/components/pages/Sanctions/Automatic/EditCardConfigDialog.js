import React, { Component } from 'react';
import Edit from '../../../common/FormsMobx/Edit';


const fields = [
    { fieldName: 'card1Type', localizedLabel: 'Sanctions.Cards.Type1', editRenderType: 'cardselect', rules: 'required'},
    { fieldName: 'card2Type', localizedLabel: 'Sanctions.Cards.Type2', editRenderType: 'cardselect', rules: 'integer'},

    { fieldName: 's1', editRenderType: 'separator', localizedLabel: 'Sanctions.Penalty' },
    { fieldName: 'penalty.text', localizedLabel: 'Sanctions.Penalty.Text', hint: 'Sanctions.Penalty.Text.Hint', editRenderType: 'textarea', rules: 'string' },
    { fieldName: 'penalty.type1', localizedLabel: 'Sanctions.Penalty.Type1', hint: 'Sanctions.Penalty.Type1.Hint', editRenderType: 'cardselect', rules: 'integer' },
    { fieldName: 'penalty.type2', localizedLabel: 'Sanctions.Penalty.Type2', hint: 'Sanctions.Penalty.Type2.Hint', editRenderType: 'text', rules: 'integer' },
    //{ fieldName: 'penalty.type3', localizedLabel: 'Sanctions.Penalty.Type3', hint: 'Sanctions.Penalty.Type3.Hint', editRenderType: 'text', rules: 'integer' },

    { fieldName: 's2', editRenderType: 'separator', localizedLabel: 'Sanctions.Cards.Other' },
    { fieldName: 'addYellowCards', localizedLabel: 'Sanctions.Cards.NumYellowCards', hint: 'Sanctions.Cards.NumYellowCards.Hint', editRenderType: 'cyclecards', rules: 'integer' },
];

const groups = [
    { fields: [ 'card1Type', 'card2Type' ], containerClassName: 'Horizontal' }
]

class EditCardConfigDialog extends Component {
    render() {
        const p = this.props;

        return (
            <Edit
                editMessage='Sanctions.Cards.EditMessage'
                addMessage='Sanctions.Cards.AddMessage'
                isEditing={p.isEditing}
                saveButtonHandler={(data) => p.action(data)}
                backButton={true}
                data={p.data}
                onBackClick={() => p.action(null)}
                fieldDefinition={ fields }
                groups={groups}
            />
        )
    }
}

export default EditCardConfigDialog;