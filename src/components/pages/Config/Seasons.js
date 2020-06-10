import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { withRouter } from 'react-router-dom';
import { formattedDate } from '../../common/FormsMobx/ListRenderHandlers';


@inject('store') @observer
class Seasons extends Component {
    render() {
        const target = this.props.store.organization.seasons;
        const ac = target.actions;

        return (
            <CrudForm 
                    title='Seasons'
                    addMessage='Add new season'
                    editMessage='Edit season'
                    listBackButton={false}

                    routeIdParamName='idSeason'

                    getAllAction={ac.getAll}
                    editAction={ac.edit}
                    addAction={ac.create}
                    deleteAction={ac.remove}
                    getByIdAction={ac.get}

                    listData={target.all ? target.all.slice() : null}
                    loadingStatus={target.loading}

                    addData={{
                        name: '',
                        startDate: new Date(),
                        endDate: new Date(), 
                    }}

                    fieldDefinition={[
                        { fieldName: 'name', localizedLabel: 'Name', editRenderType: 'text', rules: 'required|string|between:3,20' },
                        { fieldName: 'startDate', localizedLabel: 'Start date', editRenderType: 'date', listRenderHandler: formattedDate('startDate') },
                        { fieldName: 'endDate', localizedLabel: 'End date', editRenderType: 'date', listRenderHandler: formattedDate('endDate') },
                    ]}
                />
        )
    }
}

export default withRouter(Seasons);