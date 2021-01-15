import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { inject, observer } from 'mobx-react';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';

import CrudForm from '../../common/FormsMobx/CrudForm';
import TournamentDetails from './TournamentDetails';
import { textLookup, lookupById, booleanRenderHandler } from '../../common/FormsMobx/ListRenderHandlers';
import {
  getSelectOptionsFromTable,
  getSelectOptionsFromFixedValues,
} from '../../common/FormsMobx/EditRenderHandlers';
import { getUploadsIcon } from '../../helpers/Utils';

const initialActiveSeasonId = seasons => {
  if (!seasons || seasons.length === 0) return null;

  const today = moment(new Date());

  let activeSeason = seasons.find(season => {
    const start = moment(season.startDate);
    const end = moment(season.endDate);

    return today.isBetween(start, end);
  });

  if (activeSeason) return activeSeason.id;

  // NO season in range return lastest
  return seasons.sort(
    (seasonA, seasonB) => new Date(seasonA.endDate).getTime() - new Date(seasonB.endDate).getTime()
  )[0].id;
};

@inject('store')
@observer
class Tournaments extends Component {
  state = {
    activeSeasonId: null,
  };

  setActiveSeasonId = seasonId => this.setState({ activeSeasonId: seasonId });

  getTournamentLogo = tournament => {
    return (
      <img alt="" src={getUploadsIcon(tournament.logoImgUrl, tournament.id, 'tournament')} className="Logo" />
    );
  };

  componentDidMount = () => {
    // Load list of tournaments from server here instead of in the list.
    // This is to ensure that the list is available even when using it in inner routes.
    this.props.store.tournaments.actions.getAll();
    this.setActiveSeasonId(initialActiveSeasonId(this.props.seasons.seasons));
  };

  render() {
    //const { activeOrganization } = this.props.organizations;
    const { seasons: seasonsStore } = this.props.seasons;
    const { tournaments: tournamentsStore } = this.props.tournaments;

    const { store } = this.props;
    const { tournaments } = store;
    const listData = tournaments.all ? tournaments.all.slice() : null;
    const modes = store.organization.tournamentModes.all;
    const seasons = store.organization.seasons.all;

    const isTournamentsAll =
      this.props.location.pathname === '/tournaments/' || this.props.location.pathname === '/tournaments';

    const filteredTournaments = tournamentsStore.filter(
      tournament => tournament.idSeason === this.state.activeSeasonId
    );
    const sortedSeasons = seasonsStore.sort(
      (seasonA, seasonB) => new Date(seasonA.endDate).getTime() - new Date(seasonB.endDate).getTime()
    );

    return (
      <React.Fragment>
        {isTournamentsAll && (
          <div>
            <ul className="TabBar">
              {sortedSeasons.map(season => (
                <li key={uuidV4()} className="TabItem" onClick={() => this.setActiveSeasonId(season.id)}>
                  <a className={this.state.activeSeasonId === season.id ? 'active' : ''}>{season.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
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
          listData={isTournamentsAll ? filteredTournaments : listData}
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

const mapStateToProps = state => ({
  organizations: state.organizations,
  tournaments: state.tournaments,
  seasons: state.seasons,
});

export default connect(mapStateToProps)(Tournaments);
