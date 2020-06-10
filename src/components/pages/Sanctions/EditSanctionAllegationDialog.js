import React, { Component } from 'react';
import Edit from '../../common/FormsMobx/Edit';
import { inject } from 'mobx-react';

const fields = [
    { fieldName: 'title', localizedLabel: 'Sanctions.Allegation.Title', editRenderType: 'text', rules: 'required|string' },
    { fieldName: 'content', localizedLabel: 'Sanctions.Allegation.Content', hint: 'Sanctions.Allegation.Content.Hint', editRenderType: 'textarea', rules: 'required|string' },
]

const organizerFields = [
    { fieldName: 'visible', localizedLabel: 'Sanctions.Allegation.Visible', hint: 'Sanctions.Allegation.Visible.Hint', editRenderType: 'boolean' },
]

@inject('ui')
class EditSanctionAllegationDialog extends Component {
    render() {
        const p = this.props;

        const fd = p.ui.auth.isOrgAdmin() ? [ ...fields, ...organizerFields ] : fields;

        return (
            <Edit
                editMessage={null}
                addMessage={null}
                isEditing={p.data ? true : false}
                saveButtonHandler={(data) => p.action(data)}
                backButton={true}
                data={p.data}
                onBackClick={() => p.action(null)}
                fieldDefinition={ fd }
            />
        )
    }
}

export default EditSanctionAllegationDialog;