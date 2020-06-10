import React, { Component } from 'react';
import Edit from '../../../common/FormsMobx/Edit';

const commonFields = [
    { fieldName: 'name', localizedLabel: 'Group.Name', hint: '', editRenderType: 'text', rules: 'required|string|between:1,30' },
    { fieldName: 'description', localizedLabel: 'Group.Desc', hint: '', editRenderType: 'text', rules: 'string' },
]

const otherFields = [
    { fieldName: 'numTeams', localizedLabel: 'Group.NumTeams', hint: 'Group.NumTeams.Hint', editRenderType: 'text', rules: 'integer|required|between:2,128' },
    { fieldName: 'numRounds', localizedLabel: 'Group.NumRounds', hint: 'Group.NumRounds.Hint', editRenderType: 'text', rules: 'integer|required|between:1,4' }
]


class GroupEdit extends Component {
    render() {
        const p = this.props;

        return (
            <Edit
                editMessage={null}
                addMessage={null}
                isEditing={p.data ? true : false}
                saveButtonHandler={(group) => p.action(group, p.stage)}
                backButton={true}
                data={p.data}
                onBackClick={() => p.action(null)}

                fieldDefinition={ p.readOnly ? [...commonFields] : [...commonFields, ...otherFields] }
            />
        )
    }
}

export default GroupEdit;