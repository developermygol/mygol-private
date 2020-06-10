import React, { Component } from 'react';
import Edit from '../../../common/FormsMobx/Edit';
import { getSelectOptionsFromFixedValues } from '../../../common/FormsMobx/EditRenderHandlers';
import { observer } from 'mobx-react';
import { observable } from 'mobx';


@observer
class StageEdit extends Component {

    @observable isLeague = false;

    handleTypeChanged = (value) => {
        // eslint-disable-next-line eqeqeq
        this.isLeague = value == 1;
    }

    commonFields = [
        { fieldName: 'name', localizedLabel: 'Stage.Name', hint: '', editRenderType: 'text', rules: 'required|string' },
        { fieldName: 'description', localizedLabel: 'Stage.Desc', hint: '', editRenderType: 'text', rules: 'string' },
        { fieldName: 'status', localizedLabel: 'Stage.Status', hint: '', editRenderType: 'radio', selectOptions: getSelectOptionsFromFixedValues('StageStatus', 1, 3) },
        //{ fieldName: 'colorConfig', localizedLabel: 'Stage.Colors', hint: 'Stage.Colors.Hint', editRenderType: 'text', rules: '' },
        
    ]

    otherFields = [
        { fieldName: 'type', localizedLabel: 'Stage.Type', hint: '', editRenderType: 'radio', selectOptions: getSelectOptionsFromFixedValues('StageType', 1, 2), onChange: this.handleTypeChanged },
    ]

    leagueFields = [
        { fieldName: 'classificationCriteria', localizedLabel: 'Stage.ClassificationCriteria', hint: '', editRenderType: 'classificationCriteria' }
    ]

    constructor(props) {
        super(props);

        // eslint-disable-next-line eqeqeq
        this.isLeague = props.data && props.data.type == 1;
    }


    render() {
        const p = this.props;

        const readOnlyFields = p.readOnly ? null : this.otherFields;
        const fields = this.isLeague ? [ ...this.commonFields, ...readOnlyFields, ...this.leagueFields ] : [ ...this.commonFields, ...readOnlyFields ];

        return (
            <Edit
                editMessage='Stage.Edit'
                addMessage='Stage.Add'
                isEditing={p.isEditing}
                saveButtonHandler={p.action}
                backButton={true}
                data={p.data}
                onBackClick={() => p.action(null)}

                fieldDefinition={ fields }
            />
        )
    }
}

export default StageEdit;