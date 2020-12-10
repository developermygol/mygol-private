import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import CrudForm from '../../../common/FormsMobx/CrudForm';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { states } from '../../../../Constants';
import { getUploadsIcon } from '../../../helpers/Utils';
import TeamDetails from './TeamDetails';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import AddTeamDialog from './AddTeamDialog';
import { isMasterAdmin } from '../../../common/AccessLimit';

@inject('store', 'ui')
@observer
class CompetitionTeams extends Component {
  @observable showAddTeamDialog = false;

  getTeamLogo(t) {
    return this.getTeamLink(t, <img alt="" src={getUploadsIcon(t.logoImgUrl, t.id)} className="TeamLogo" />);
  }

  getTeamLink(t, content) {
    const { url } = this.props.match;
    return <Link to={url + '/' + t.id}>{content}</Link>;
  }

  handlePictureUpload = () => {
    document.querySelector('#fileSelector').click();
  };

  handleFileChange = event => {
    const file = event.target.files[0];
    if (file) this.uploadFile(file, this.props.match.params.idTournament);
  };

  uploadFile = async (file, idTournament) => {
    // Create an object of formData
    const formData = new FormData();
    const store = this.props.store.teams;

    // Update the formData object
    formData.append('idTournament', idTournament);
    formData.append('file', file, file.name);

    const response = await this.props.store.teams.uploadTeam(formData);

    if (response.data === true) {
      const getUpdatedTeamByTournament = await store.getTeamsFilteredByTournament(idTournament);
      toast.success('✔ Team Added');
      store.all = getUpdatedTeamByTournament;
    } else {
      if (response.data.Message) toast.error(`❌ ${response.data.Message}`);
    }
  };

  @action handleAddTeam = () => {
    this.showAddTeamDialog = true;
  };

  @action handleTeamAdded = async data => {
    this.showAddTeamDialog = false;
    if (!data) return;

    const store = this.props.store.teams;
    const idTournament = this.props.match.params.idTournament;
    const idTeam = data.id;

    const addedTeam = await store.addTeamToTournament(idTournament, idTeam);

    if (addedTeam) {
      const getUpdatedTeamByTournament = await store.getTeamsFilteredByTournament(idTournament);
      toast.success('✔ Team Added');
      store.all = getUpdatedTeamByTournament;
    }

    // store.addTeamToTournament(idTournament, idTeam).then((res) => {
    //   store.actions.getAll();
    // });
  };

  render() {
    const currentTournament = this.props.store.tournaments.current;
    if (!currentTournament) return null;

    const tId = currentTournament.id;
    const { teamStates } = states;

    const teams = this.props.store.teams;
    const listData = teams.all ? teams.all.slice() : null;
    const { auth } = this.props.ui;

    const isAllowed = isMasterAdmin(parseInt(auth.level, 10));

    return (
      <div>
        <CrudForm
          title="Teams"
          addMessage="Create new team"
          editMessage="Edit team"
          listAdditionalButtons={
            isAllowed && (
              <React.Fragment>
                <button className="Button" onClick={this.handleAddTeam}>
                  <Loc>Add existing team</Loc>
                </button>
                <button className="Button" onClick={this.handlePictureUpload}>
                  <Loc>Import team</Loc>
                </button>
                <input
                  id="fileSelector"
                  style={{ display: 'none' }}
                  type="file"
                  onChange={this.handleFileChange}
                />
              </React.Fragment>
            )
          }
          deleteDialogTitle="Unlink team?"
          deleteDialogMessage="Confirm team unlink"
          getAllAction={() => teams.actions.getAll(teams.getListUrl(tId))}
          addAction={data => teams.actions.create(data, teams.getCreateUrl(tId))}
          editAction={data => teams.actions.edit(data)}
          deleteAction={data => teams.actions.remove(data, teams.getDeleteUrl(tId))}
          getByIdAction={id => teams.actions.get(id)}
          listData={listData}
          listBackButton={false}
          routeIdParamName="idTeam"
          detailsComponent={TeamDetails}
          getStateMap={state => ({ listData: state.entities.teams.byId })}
          addData={{
            keyName: '',
            name: '',
            status: 0,
            idField: 0,
            logoImgUrl: null,
          }}
          fieldDefinition={[
            {
              fieldName: 'logoImgUrl',
              localizedLabel: 'Logo',
              listRenderHandler: t => this.getTeamLogo(t),
            },
            {
              fieldName: 'keyName',
              localizedLabel: 'Short name',
              listRenderHandler: t => this.getTeamLink(t, t.keyName),
              editRenderType: 'text',
              rules: 'required|between:1,4',
            },
            {
              fieldName: 'name',
              localizedLabel: 'Team name',
              listRenderHandler: t => this.getTeamLink(t, t.name),
              editRenderType: 'text',
              rules: 'required|between:1,100',
            },
            {
              fieldName: 'idField',
              localizedLabel: 'Local field',
              hint: 'Local field.hint',
              editRenderType: 'facilitySelector',
              rules: 'integer',
              hideInList: true,
            },
            //{ fieldName: 'prefTime', localizedLabel: 'Preferred time', hint: 'Preferred time.hint', editRenderType: 'time', hideInList: true },
            {
              fieldName: 'status',
              localizedLabel: 'Team status',
              listRenderHandler: r => listArrayLookup(teamStates, r, 'status'),
              editRenderType: 'localizedradio',
              selectOptions: teamStates,
            },
            {
              fieldName: 'idGoalKeeper',
              localizedLabel: 'Team goalkeeper',
              hint: 'Team goalkeeper.hint',
              editRenderType: 'goalkeeperSelector',
              rules: 'integer',
              hideInList: true,
            },
          ]}
        />

        <AddTeamDialog show={this.showAddTeamDialog} onClose={this.handleTeamAdded} />
      </div>
    );
  }
}

// This takes an array of objects with label and listClassName attributes.
// The value is the index of the items array
const listArrayLookup = (lookupTableData, row, valueField) => {
  const value = row[valueField];
  const result = lookupTableData[value];
  const className = result.listClassName || '';
  return <span className={className}>{Localize(result.label)}</span>;
};

export default withRouter(CompetitionTeams);
