import React, { Component } from 'react';
import Edit from '../../../common/FormsMobx/Edit';

const fields = [
  {
    fieldName: 'name',
    localizedLabel: 'Sanctions.Cycles.Name',
    editRenderType: 'text',
    rules: 'required|string',
  },
  {
    fieldName: 'numYellowCards',
    localizedLabel: 'Sanctions.Cycles.NumYellowCards',
    hint: 'Sanctions.Cycles.NumYellowCards.Hint',
    editRenderType: 'text',
    rules: 'integer',
  },
  { fieldName: 's1', editRenderType: 'separator', localizedLabel: 'Sanctions.Penalty' },
  {
    fieldName: 'penalty.text',
    localizedLabel: 'Sanctions.Penalty.Text',
    hint: 'Sanctions.Penalty.Text.Hint',
    editRenderType: 'textarea',
    rules: 'string',
  },
  //{ fieldName: 'penalty.type1', localizedLabel: 'Sanctions.Penalty.Type1', editRenderType: 'cardselect', rules: 'integer' },
  {
    fieldName: 'penalty.type2',
    localizedLabel: 'Sanctions.Penalty.Type2',
    hint: 'Sanctions.Penalty.Type2.Hint',
    editRenderType: 'text',
    rules: 'integer',
  },
  //{ fieldName: 'penalty.type3', localizedLabel: 'Sanctions.Penalty.Type3', hint: 'Sanctions.Penalty.Type3.Hint', editRenderType: 'text', rules: 'integer' },
];

class EditCycleConfigDialog extends Component {
  render() {
    const p = this.props;

    return (
      <Edit
        editMessage="Sanctions.Cycles.EditMessage"
        addMessage="Sanctions.Cycles.AddMessage"
        isEditing={p.isEditing}
        saveButtonHandler={data => p.action(data)}
        backButton={true}
        data={p.data}
        onBackClick={() => p.action(null)}
        fieldDefinition={fields}
      />
    );
  }
}

export default EditCycleConfigDialog;
