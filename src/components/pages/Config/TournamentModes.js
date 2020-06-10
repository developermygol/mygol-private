import React, { Component } from 'react';
import CrudForm from '../../common/FormsMobx/CrudForm';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('store') @observer
class TournamentModes extends Component {
    render() {
        const target = this.props.store.organization.tournamentModes;
        const ac = target.actions;
        //const { path, url } = this.props.match;

        return (
            <CrudForm
                    title='Tournament modes'
                    addMessage='Add new tournament mode'
                    editMessage='Edit tournament mode'
                    listBackButton={false}

                    routeIdParamName='idTournamentMode'
                    // listRoutePath={path}
                    // routePath={path + '/modes'}
                    // routeUrl={ url + '/modes'}

                    getAllAction={ac.getAll}
                    editAction={ac.edit}
                    addAction={ac.create}
                    deleteAction={ac.remove}
                    getByIdAction={ac.get}

                    listData={target.all ? target.all.slice() : null}
                    loadingStatus={target.loading}

                    addData={{
                        name: '',
                        numPlayers: 5
                    }}

                    fieldDefinition={[
                        { fieldName: 'name', localizedLabel: 'Name', editRenderType: 'text', rules: 'required|string|between:3,20' },
                        { fieldName: 'numPlayers', localizedLabel: 'NumPlayers', editRenderType: 'text', rules: 'required|integer|between:5,11' },
                    ]}
                />
        )
    }
}

export default withRouter(TournamentModes);