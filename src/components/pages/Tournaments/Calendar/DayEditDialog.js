import React, { Component } from 'react';
import Edit from '../../../common/FormsMobx/Edit';
import { inject, observer } from 'mobx-react';
import { getIdNameSelectOptions } from './CalendarView';


@inject('store') @observer
class DayEditDialog extends Component {
    getStageSelectOptions = (stages) => {
        return getIdNameSelectOptions(stages);
    }

    render() {
        const p = this.props;
        const stages = p.store.stages.all;

        const fields = [
            { fieldName: 'name', localizedLabel: 'Name', editRenderType: 'text', rules: 'required|string|between:1,50' },
            { fieldName: 'idStage', localizedLabel: 'Stage', editRenderType: 'select', selectOptions: this.getStageSelectOptions(stages), rules: 'integer|required|min:1' },
            { fieldName: 'sequenceOrder', localizedLabel: 'PlayDay.SequenceOrder', hint: 'PlayDay.SequenceOrder.Hint', editRenderType: 'text', rules: 'integer|required' },
        ]

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

export default DayEditDialog;