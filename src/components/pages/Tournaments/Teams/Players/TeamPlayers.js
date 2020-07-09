import React, { Component, Fragment } from 'react';
import CrudForm from '../../../../common/FormsMobx/CrudForm';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { getPlayerIdPicture } from '../../../../helpers/Utils';
import PlayerDetails from '../../../Players/PlayerDetails';
import Loc, { Localize } from '../../../../common/Locale/Loc';
import PlayerInviteDialog from '../../../Players/Invite/PlayerInviteDialog';
import { observable } from 'mobx';
import { getSelectOptionsFromFixedValues } from '../../../../common/FormsMobx/EditRenderHandlers';
import PlayerFlagsViewComponent from './PlayerFlagsViewComponent';
import { isTeamInAdmins } from '../../../../../RouteValidation';
import YesNoPicker from '../../../../common/FormFields/YesNoPicker';

const PlayerEnrollmentOptions = [
  { value: 0, label: Localize('PlayerEnrollStatus0') },
  { value: 1, label: Localize('PlayerEnrollStatus1') },
  { value: 2, label: Localize('PlayerEnrollStatus2') },
  { value: 3, label: Localize('PlayerEnrollStatus3') },
  { value: 4, label: Localize('PlayerEnrollStatus4') },
  { value: 10, label: Localize('PlayerEnrollStatus10') },
];

const TeamEnrollmentOptions = [
  { value: 0, label: Localize('TeamEnrollStatus0') },
  { value: 10, label: Localize('TeamEnrollStatus10') },
  { value: 100, label: Localize('TeamEnrollStatus100') },
  { value: 101, label: Localize('TeamEnrollStatus101') },
  { value: 102, label: Localize('TeamEnrollStatus102') },
];

@inject('store', 'ui')
@observer
class TeamPlayers extends Component {
  @observable showInviteDialog = false;

  getPlayerImage = player => {
    return this.getPlayerLink(
      player,
      //getUploadsImg(player.userData.avatarImgUrl, player.id, 'user', 'PlayerAvatar Mini')
      getPlayerIdPicture(player.idPhotoImgUrl, 'PlayerAvatar Mini')
    );
  };

  getPlayerLink = (player, content) => {
    return <Link to={this.props.match.url + '/' + player.id}>{content}</Link>;
  };

  handleInvitePlayer = () => {
    this.showInviteDialog = true;
  };

  handlePlayerInvited = data => {
    this.showInviteDialog = false;
    if (!data) return;

    const p = this.props;
    const { idTeam, idTournament } = p.match.params;

    this.props.store.players
      .invitePlayer(data.selectedItem.id, idTeam, idTournament, data.inviteText)
      .then(res => {
        this.props.store.players.actions.getAll('/players/forteam/' + idTeam);
      });
  };

  handleCreate = data => {
    const { params } = this.props.match;

    data.teamData = {
      idTeam: params.idTeam,
      idTournament: params.idTournament,
    };

    return this.props.store.players.create(data); // Not actions.create
  };

  hideAllBut = (fields, visibleFields) => {
    fields.forEach(f => {
      if (visibleFields.indexOf(f.fieldName) === -1)
        // Not in list of visibles, hide.
        f.hideInEdit = true;
    });
  };

  showAllBut = (fields, hideFields) => {
    fields.forEach(f => {
      if (hideFields.indexOf(f.fieldName) > -1)
        // In list of fields to hide.
        f.hideInEdit = true;
    });
  };

  getAfterEditRedirect = () => {
    const p = this.props;
    const auth = p.ui.auth;

    switch (auth.level.toString()) {
      case '4':
        return null; // OrgAdmin
      case '2': // Referee
      case '1': // Player
        if (this.isTeamAdmin()) return null; // So it goes to the natural return path: the players list.
        return '/';
      default:
        return null;
    }
  };

  apparelNumberRender = r => {
    return (
      <div>
        <span className="ApparelNumber">{r.teamData.apparelNumber}</span>
        {r.teamData.isTeamAdmin === 'true' ? <span className="TeamAdmin"></span> : null}
      </div>
    );
  };

  teamPlayerStatusChanged = (player, newState) => {
    //alert(player.id + ' ' + newState);
    const p = this.props;
    const { idTournament, idTeam } = p.match.params;
    const store = this.props.store.players;

    store.setTeamPlayerFlags(player.id, idTeam, idTournament, newState);
  };

  teamStatusRender = r => {
    const auth = this.props.ui.auth;
    const onChange = auth.isOrgAdmin() ? newState => this.teamPlayerStatusChanged(r, newState) : null;

    return <PlayerFlagsViewComponent value={r.teamData.status} onChange={onChange} />;
  };

  approvedStatusRender = r => {
    //return r.approved.toString();
    return <YesNoPicker value={r.approved} onChange={v => this.approvedStatusChanged(r, v)} />;
  };

  approvedStatusChanged = (player, newValue) => {
    const store = this.props.store.players;
    store.setPlayerApprovedStatus(player.id, newValue);
  };

  isTeamAdmin = () => {
    const p = this.props;
    const auth = p.ui.auth;

    return isTeamInAdmins(p.match.params.idTeam, auth.adminTeamIds);
  };

  getFields = () => {
    let fields = [
      {
        fieldName: 'idPhotoImgUrl',
        localizedLabel: 'FichaImg',
        listRenderHandler: this.getPlayerImage,
        editRenderType: 'upload',
        passProps: { uploadType: 200, idField: 'id' },
        hideInAdd: true,
      },
      {
        fieldName: 'userData.avatarImgUrl',
        localizedLabel: 'AvatarImg',
        hideInList: true,
        editRenderType: 'upload',
        passProps: { uploadType: 200, idField: 'id' },
        hideInAdd: true,
      },
      {
        fieldName: 'name',
        localizedLabel: 'Name',
        listRenderHandler: r => this.getPlayerLink(r, r.name),
        editRenderType: 'text',
        rules: 'required|string|between:3,100',
        hint: 'Hint.Required',
      },
      {
        fieldName: 'surname',
        localizedLabel: 'Surname',
        listRenderHandler: r => this.getPlayerLink(r, r.surname),
        editRenderType: 'text',
        rules: 'required|string|between:3,100',
        hint: 'Hint.Required',
      },
      {
        fieldName: 'approved',
        localizedLabel: 'IsApproved',
        hint: 'IsApproved.Hint',
        hideInList: false,
        hideInAdd: true,
        listRenderHandler: this.approvedStatusRender,
        editRenderType: 'localizedradio',
        selectOptions: [
          { value: 'false', label: 'No' },
          { value: 'true', label: 'Yes' },
        ],
        passProps: { className: 'Horizontal' },
      },
      {
        fieldName: 'userData.password_confirmation',
        localizedLabel: 'Password',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'Password',
        rules: 'string|between:8,50',
      },
      {
        fieldName: 'userData.password',
        localizedLabel: 'Repeat password',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'Password',
        rules: 'string|between:8,50|confirmed',
      },
      {
        fieldName: 's1',
        localizedLabel: 'Team data',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'separator',
      },
      {
        fieldName: 'teamData.apparelNumber',
        localizedLabel: 'ApparelNumber',
        listRenderHandler: this.apparelNumberRender,
        editRenderType: 'text',
        hideInAdd: true,
      },
      {
        fieldName: 'teamData.fieldPosition',
        localizedLabel: 'FieldPosition',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'select',
        // selectOptions: getSelectOptionsFromFixedValues("FieldPosition", 0, 6),
        selectOptions: getSelectOptionsFromFixedValues('FieldPosition', 0, 12, null, null, [8, 9]), // This positions in production are not shown
        hint: 'FieldPosition.Hint',
      },
      {
        fieldName: 'teamData.fieldSide',
        localizedLabel: 'FieldSide',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'select',
        selectOptions: getSelectOptionsFromFixedValues('FieldSide', 0, 3),
        hint: 'FieldSide.Hint',
      },
      {
        fieldName: 'teamData.status',
        localizedLabel: 'PlayerStatus',
        listRenderHandler: this.teamStatusRender,
        editRenderType: 'teamplayerstatus',
        hideInAdd: true,
        hint: 'PlayerStatus.Hint',
      },
      {
        fieldName: 'teamData.isTeamAdmin',
        localizedLabel: 'IsTeamAdmin',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'localizedradio',
        selectOptions: [
          { value: 'false', label: 'No' },
          { value: 'true', label: 'Yes' },
        ],
      },

      {
        fieldName: 's3',
        localizedLabel: 'Personal data',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'separator',
      },

      {
        fieldName: 'userData.email',
        localizedLabel: 'Email',
        hideInList: true,
        editRenderType: 'text',
        rules: 'required|email',
        hint: 'Hint.Required',
      },
      {
        fieldName: 'userData.mobile',
        localizedLabel: 'Mobile',
        hideInList: true,
        editRenderType: 'text',
        rules: 'required|numeric',
        hint: 'Hint.Required',
      },
      {
        fieldName: 'idCardNumber',
        localizedLabel: 'IdCard',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },

      {
        fieldName: 'birthDate',
        localizedLabel: 'BirthDate',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'date',
      },
      {
        fieldName: 'address1',
        localizedLabel: 'Address1',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },
      {
        fieldName: 'address2',
        localizedLabel: 'Address2',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },
      {
        fieldName: 'city',
        localizedLabel: 'City',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },
      {
        fieldName: 'state',
        localizedLabel: 'State',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },
      {
        fieldName: 'cp',
        localizedLabel: 'CP',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },
      {
        fieldName: 'country',
        localizedLabel: 'Country',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },

      {
        fieldName: 's4',
        localizedLabel: 'Public profile data',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'separator',
      },
      {
        fieldName: 'height',
        localizedLabel: 'Height',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
        hint: 'Height.Hint',
      },
      {
        fieldName: 'weight',
        localizedLabel: 'Weight',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
        hint: 'Weight.Hint',
      },

      {
        fieldName: 'facebookKey',
        localizedLabel: 'FacebookKey',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },
      {
        fieldName: 'twitterKey',
        localizedLabel: 'TwitterKey',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },
      {
        fieldName: 'instagramKey',
        localizedLabel: 'InstagramKey',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'text',
      },

      // { fieldName: 'largeImgUrl', localizedLabel: 'LargeImgUrl', hideInList: true, hideInAdd: true, editRenderType: 'upload', passProps: { uploadType: 201, idField: 'id' } },
      // { fieldName: 'signatureImgUrl', localizedLabel: 'SignatureImgUrl', hideInList: true, hideInAdd: true, editRenderType: 'upload', passProps: { uploadType: 202, idField: 'id' } },
      {
        fieldName: 'motto',
        localizedLabel: 'Motto',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'textarea',
      },

      {
        fieldName: 's5',
        localizedLabel: 'Advanced.Enrollment',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'separator',
      },
      {
        fieldName: 'enrollmentStep',
        localizedLabel: 'PlayerEnrollStep',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'select',
        selectOptions: PlayerEnrollmentOptions,
      }, // TODO: remove DEVELONLY
      {
        fieldName: 'teamData.enrollmentStep',
        localizedLabel: 'TeamEnrollStep',
        hideInList: true,
        hideInAdd: true,
        editRenderType: 'select',
        selectOptions: TeamEnrollmentOptions,
      }, // TODO: remove DEVELONLY
    ];

    const p = this.props;
    const { auth } = p.ui;
    const userLevel = Number(auth.level);

    switch (userLevel) {
      case 4: // OrgAdmin
        // Can edit everything
        break;

      case 1: // Player
        if (this.isTeamAdmin()) {
          this.hideAllBut(fields, ['teamData.apparelNumber', 'teamData.fieldSide', 'teamData.fieldPosition']);
        } else {
          this.showAllBut(fields, [
            'idCardNumber',
            'idPhotoImgUrl',
            'userData.email',
            'approved',
            'teamData.apparelNumber',
            'teamData.status',
            'teamData.isTeamAdmin',
            'enrollmentStep',
            'teamData.enrollmentStep',
          ]);
        }
        break;

      case 2: // Referee
        break;

      default:
        fields = [];
        break;
    }

    return fields;
  };

  render() {
    const players = this.props.store.players;
    const listData = players.all ? players.all.slice() : null;
    const { idTeam, idTournament } = this.props.match.params;

    //const auth = this.props.ui.auth;
    //const isOrgAdmin = auth.isOrgAdmin();

    return (
      <Fragment>
        <CrudForm
          title="Players"
          addMessage="Add new player"
          editMessage="Edit player"
          detailsComponent={PlayerDetails}
          getAllAction={() => players.actions.getAll('/players/forteam/' + idTeam)}
          getByIdAction={id =>
            players.actions.get(id, `/players/${id}/${idTeam}?idTournament=${idTournament}`)
          }
          editAction={data => players.actions.edit(data)}
          addAction={data => this.handleCreate(data)}
          deleteAction={data => players.unlinkTeam(data, idTournament)}
          deleteDialogTitle="Unlink player?"
          deleteDialogMessage="Confirm player unlink"
          afterEditRedirect={this.getAfterEditRedirect()}
          listData={listData}
          loadingStatus={players.loading}
          routeIdParamName="idPlayer"
          listBackButton={false}
          listAdditionalButtons={
            <button className="Button" onClick={this.handleInvitePlayer}>
              <Loc>Invite player</Loc>
            </button>
          }
          addData={{
            name: null,
            surname: null,
            userData: {
              email: null,
              mobile: null,
            },
          }}
          fieldDefinition={this.getFields()}
        />

        <PlayerInviteDialog
          show={this.showInviteDialog}
          onCancel={() => (this.showInviteDialog = false)}
          onFinish={this.handlePlayerInvited}
        />
      </Fragment>
    );
  }
}

export default withRouter(TeamPlayers);
