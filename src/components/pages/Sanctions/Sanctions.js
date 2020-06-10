import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { textLookup } from '../../common/FormsMobx/ListRenderHandlers';
import { Link, withRouter } from 'react-router-dom';
import { getSelectOptionsFromFixedValues } from '../../common/FormsMobx/EditRenderHandlers';
import { observable } from 'mobx';
import SanctionDetails from './SanctionDetails';
import { getFormattedDate } from '../../common/FormsMobx/Utils';
import DialogCrudForm from '../../common/FormsMobx/DialogCrudForm';
import { findByIdInArray } from '../../helpers/Data';
import SanctionList from './SanctionList';
import EditSanctionDialogProxy from './EditSanctionDialogProxy';

@inject('store') @observer
class Sanctions extends Component {

    @observable players = [];
    @observable team = null;
    @observable initial = { type: 0, status: 2, caption: 'Add new sanction' };

    getSanctionLink = (idSanction, content) => {
        const {idTournament} = this.props.match.params;
        return <Link to={'/tournaments/' + idTournament + '/sanctions/' + idSanction}>{content}</Link>
    }

    getPlayerSanctionLink = (row) => {
        const pl = row.player;
        const caption = pl ? (pl.name + ' ' + pl.surname) : (row.id);
        return this.getSanctionLink(row.id, caption);
    }

    getPlayer = (row) => {
        const pl = row.player;
        return pl ? (pl.name + ' ' + pl.surname) : (row.id);
    }

    getDateSanctionLink = (row) => {
        return this.getSanctionLink(row.id, getFormattedDate(row.startDate));
    }

    createAction = (data, url, okMessage, addLocally) => {
        // Set player and team data in record so they can be displayed in grid right after creation
        const pl = findByIdInArray(this.players, data.idPlayer);
        data.player = pl && pl.player;
        data.team = this.team;

        return this.props.store.sanctions.actions.create(data, url, okMessage, addLocally);
    }

    getTeams = () => {
        const match = this.props.matchData;
        if (!match) return [];

        return [
            { label: '--', value: null},
            { label: match.homeTeam && match.homeTeam.name, value: match.idHomeTeam, onSelected: () => this.teamClickHandler(match.homePlayers) },
            { label: match.visitorTeam && match.visitorTeam.name, value: match.idVisitorTeam, onSelected: () => this.teamClickHandler(match.visitorPlayers) }
        ];
    }

    teamClickHandler = (players) => {
        if (!players) return;

        const result = players
            .filter(p => p.matchData.status === 1)
            .map(p => ({
                value: p.id,
                label: p.teamData.apparelNumber + ' - ' + p.name + ' ' + p.surname
            }));

        result.unshift({label: '--', value: null});

        this.players = result;
    }

    addPlayerSanctionHandler = (prevAddButtonHandler) => {
        this.initial.type = 0;
        this.initial.status = 2;
        this.initial.caption = 'Add new sanction';

        prevAddButtonHandler();
    }

    addTeamSanctionHandler = (prevAddButtonHandler) => {
        this.initial.type = 2;
        this.initial.status = 4;
        this.initial.caption = 'Add new team sanction';
        prevAddButtonHandler();
    }

    render() {
        const p = this.props;
        const store = p.store.sanctions;
        const sanctions = p.sanctions || (store && store.all);
        const ac = store.actions;

        const { idTournament, idMatch, idDay, idTeam, idPlayer, startDate, canAdd } = p;
        const { getAllAction } = p;

        return (
            <DialogCrudForm
                addMessage={this.initial.caption}
                editMessage='Edit sanction'
                listBackButton={false}
                detailsComponent={SanctionDetails}

                routeIdParamName='idSanction'

                getAllAction={getAllAction}
                editAction={ac.edit}
                addAction={this.createAction}
                deleteAction={ac.remove}
                getByIdAction={ac.get}

                addButtonClass=''
                listData={sanctions ? sanctions.slice() : null}
                listComponent={SanctionList}
                editComponent={EditSanctionDialogProxy}
                loadingStatus={store.loading}
                canAdd={canAdd}
                idFieldName='id'

                passProps={{
                    addPlayerSanctionHandler: this.addPlayerSanctionHandler, 
                    addTeamSanctionHandler: this.addTeamSanctionHandler
                }}

                addData={{
                    type: this.initial.type,
                    idTournament,
                    idMatch,  
                    idDay,
                    idPlayer: idPlayer || 0,
                    idTeam,
                    status: this.initial.status,
                    startDate: startDate || new Date(),
                    title: '', 
                    initialContent: '', 
                    numMatches: 1, 
                    idPayment: -1,
                    lostMatchPenalty: 0,
                    tournamentPointsPenalty: 0,
                }}

                fieldDefinition={[
                    { fieldName: 'type', hideInEdit: true, hideInAdd: true },
                    { fieldName: 'startDate', localizedLabel: 'Start date', editRenderType: 'date', listRenderHandler: this.getDateSanctionLink },
                    { fieldName: 'idTeam', localizedLabel: 'Team', editRenderType: 'select', selectOptions: this.getTeams(), hideInEdit: true, rules: 'required' }, 
                    { fieldName: 'idPlayer', localizedLabel: 'Player', editRenderType: 'select', selectOptions: this.players, hideInEdit: true, rules: 'required' },
                    { fieldName: 'player.name', localizedLabel: 'Player', hideInEdit: true, hideInAdd: true,  listRenderHandler: this.getPlayer },
                    { fieldName: 'team.name', localizedLabel: 'Team', hideInEdit: true, hideInAdd: true },
                    { fieldName: 'title', localizedLabel: 'Sanctions.Title', editRenderType: 'text', rules: 'max:100' },
                    { fieldName: 'status', localizedLabel: 'Sanctions.Status', editRenderType: 'select', selectOptions: getSelectOptionsFromFixedValues('SanctionStatus', 1, 4), listRenderHandler: textLookup('SanctionStatus', 'status') },
                    { fieldName: 'numMatches', localizedLabel: 'Sanctions.NumMatches', editRenderType: 'text', rules: 'integer|min:0' },
                    { fieldName: 'lostMatchPenalty', localizedLabel: 'Sanctions.LostMatchPenalty', hint: 'Sanctions.LostMatchPenalty.Hint', editRenderType: 'text', rules: 'integer|min:0' },
                    { fieldName: 'tournamentPointsPenalty', localizedLabel: 'Sanctions.TournamentPointsPenalty', hint:'Sanctions.TournamentPointsPenalty.Hint', editRenderType: 'text', rules: 'integer|min:0' },
                    { fieldName: 'initialContent', localizedLabel: 'Sanctions.InitialContent', editRenderType: 'textarea', rules: 'string', hideInEdit: true },
                ]}
            />
        )
    }
}

export default withRouter(Sanctions);