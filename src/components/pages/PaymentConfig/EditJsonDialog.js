import React, { Component } from 'react';
import Edit from '../../common/FormsMobx/Edit';

class EditJsonDialog extends Component {
    render() {
        const p = this.props;
        const { fieldName, localizedLabel } = p;

        return (

            <Edit
                editMessage={null}
                addMessage={null}
                saveButtonHandler={p.action}
                isEditing={true}
                data={p.data}
                backButton={true}
                onBackClick={() => p.action(null)}
                fieldDefinition={[
                    { fieldName, localizedLabel, hideInList: true, editRenderType: 'textarea', rules: 'required' },
                ]}
            />
        )
    }
}

export default EditJsonDialog