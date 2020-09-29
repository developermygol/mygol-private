import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CrudForm from '../../common/FormsMobx/CrudForm';
import TournamentDetails from './TournamentDetails';
import { inject, observer } from 'mobx-react';
import { textLookup, lookupById, booleanRenderHandler } from '../../common/FormsMobx/ListRenderHandlers';
import {
  getSelectOptionsFromTable,
  getSelectOptionsFromFixedValues,
} from '../../common/FormsMobx/EditRenderHandlers';
import { getUploadsIcon } from '../../helpers/Utils';

@inject('store')
@observer
class Tournaments extends Component {
  getTournamentLogo = tournament => {
    return (
      <img alt="" src={getUploadsIcon(tournament.logoImgUrl, tournament.id, 'tournament')} className="Logo" />
    );
  };

  componentDidMount = () => {
    // Load list of tournaments from server here instead of in the list.
    // This is to ensure that the list is available even when using it in inner routes.
    this.props.store.tournaments.actions.getAll();
  };

  render() {
    const { store } = this.props;
    const { tournaments } = store;
    const listData = tournaments.all ? tournaments.all.slice() : null;
    const modes = store.organization.tournamentModes.all;
    const seasons = store.organization.seasons.all;

    return (
      <React.Fragment>
        <CrudForm
          title="Tournaments"
          addMessage="Create new tournament"
          editMessage="Edit tournament"
          editAction={data => tournaments.actions.edit(data)}
          addAction={data => tournaments.actions.create(data)}
          deleteAction={data => tournaments.actions.remove(data)}
          getByIdAction={id => tournaments.actions.get(id)}
          detailsComponent={TournamentDetails}
          routeIdParamName="idTournament"
          listData={listData}
          addData={{
            logoImgUrl: null,
            name: '',
            type: 1,
            status: 1,
            idTournamentMode: null,
            idSeason: null,
          }}
          fieldDefinition={[
            {
              fieldName: 'logoImgUrl',
              localizedLabel: 'Logo',
              listRenderHandler: this.getTournamentLogo,
              editRenderType: 'upload',
              passProps: { uploadType: 300, idField: 'id' },
              hideInAdd: true,
            },
            {
              fieldName: 'name',
              localizedLabel: 'Tournament',
              localizedHint: 'Tournament name',
              listRenderHandler: v => <Link to={'/tournaments/' + v.id}>{v.name}</Link>,
              editRenderType: 'text',
              selectOptions: null,
              rules: 'required|between:4,50',
            },
            // {
            //     fieldName: 'type',
            //     localizedLabel: 'TournamentType',
            //     listRenderHandler: textLookup('TournamentType', 'type'),
            //     editRenderType: 'radio',
            //     selectOptions: getSelectOptionsFromFixedValues('TournamentType', 1, 2),
            // },
            {
              fieldName: 'status',
              localizedLabel: 'TournamentStatus',
              listRenderHandler: textLookup('TournamentStatus', 'status'),
              editRenderType: 'radio',
              selectOptions: getSelectOptionsFromFixedValues('TournamentStatus', 1, 4),
              hideInEdit: true,
              hideInAdd: true,
              passProps: { additionalClass: 'Horizontal' },
            },
            {
              fieldName: 'idTournamentMode',
              localizedLabel: 'Tournament mode',
              listRenderHandler: lookupById(modes, 'idTournamentMode', 'name'),
              editRenderType: 'select',
              selectOptions: getSelectOptionsFromTable(modes, 'name', true),
              rules: 'required|integer',
            },
            {
              fieldName: 'idSeason',
              localizedLabel: 'Season',
              listRenderHandler: lookupById(seasons, 'idSeason', 'name'),
              editRenderType: 'select',
              selectOptions: getSelectOptionsFromTable(seasons, 'name', true),
              rules: 'required|integer',
            },
            {
              fieldName: 'visible',
              localizedLabel: 'Tournament.Visible',
              hint: 'Tournament.Visible.Hint',
              hideInList: false,
              listRenderHandler: booleanRenderHandler('visible'),
              editRenderType: 'localizedradio',
              selectOptions: [
                { value: 'false', label: 'No' },
                { value: 'true', label: 'Yes' },
              ],
            },
          ]}
        />
      </React.Fragment>
    );
  }
}

export default Tournaments;
