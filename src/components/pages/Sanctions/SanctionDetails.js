import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';
import { observable, action } from 'mobx';
import Loc, { Localize } from '../../common/Locale/Loc';
import { getFormattedDate, getFormattedDateTime } from '../../common/FormsMobx/Utils';
import EditSanctionAllegationDialog from './EditSanctionAllegationDialog';
import EditDialog from '../Tournaments/Stages/EditDialog';
import AccessLimit from '../../common/AccessLimit';
import MessageBox from '../../common/Dialogs/MessageBox';
import { getPlayerLink, getTeamLink, getMatchLink } from '../../helpers/Utils';
import MatchView from '../Tournaments/Calendar/MatchView';

class DetailField extends Component {
  render() {
    const p = this.props;

    return (
      <div className="Field">
        <p className="Header">
          <Loc>{p.label}</Loc>
        </p>
        <p className="Value">{p.value}</p>
      </div>
    );
  }
}

class SanctionDetailsCard extends Component {
  render() {
    const p = this.props;
    const { sanction } = p;

    return (
      <div className="Sanctions Card Hero">
        <h3>
          <Loc>{sanction.type === 2 ? 'Sanctions.Type.Team' : 'Sanctions.Type.Player'}</Loc>
          <AccessLimit allowOrgAdmin>
            <button className="Button Second Right" onClick={() => p.editButtonHandler(sanction)}>
              <Loc>Edit</Loc>
            </button>
          </AccessLimit>
        </h3>
        <div className="Content">
          <div className="Details">
            {sanction.type === 2 ? ( // Team sanctions
              <Fragment>
                <DetailField
                  label="Team"
                  value={getTeamLink(
                    sanction.idTournament,
                    sanction.idTeam,
                    sanction.team && sanction.team.name
                  )}
                />
                <DetailField label="Tournament" value={sanction.tournament && sanction.tournament.name} />
                <DetailField label="Start date" value={getFormattedDate(sanction.startDate)} />
                <DetailField label="Sanctions.Status" value={Localize('SanctionStatus' + sanction.status)} />
                <DetailField
                  label="Sanctions.Match"
                  value={getMatchLink(
                    sanction.idTournament,
                    sanction.idMatch,
                    Localize('Sanctions.Match.Click')
                  )}
                />
                {/* <DetailField label='Sanctions.Match' value={sanction.idMatch} /> */}
              </Fragment>
            ) : (
              // Player sanctions
              <Fragment>
                <DetailField
                  label="Player"
                  value={getPlayerLink(sanction.idTournament, sanction.idTeam, sanction.player)}
                />
                <DetailField
                  label="Team"
                  value={getTeamLink(
                    sanction.idTournament,
                    sanction.idTeam,
                    sanction.team && sanction.team.name
                  )}
                />
                <DetailField label="Tournament" value={sanction.tournament && sanction.tournament.name} />
                <DetailField label="Start date" value={getFormattedDate(sanction.startDate)} />
                <DetailField label="Sanctions.NumMatches" value={sanction.numMatches} />
                <DetailField label="Sanctions.Status" value={Localize('SanctionStatus' + sanction.status)} />
                <DetailField
                  label="Sanctions.Match"
                  value={getMatchLink(
                    sanction.idTournament,
                    sanction.idMatch,
                    Localize('Sanctions.Match.Click')
                  )}
                />
                {/* <DetailField label='Sanctions.Match' value={sanction.idMatch} /> */}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

@inject('ui')
class SanctionAllegation extends Component {
  render() {
    const p = this.props;
    const al = p.allegation;

    // const user = al.user || { level: al.idUser >= 10000000 ? 5 : 1, name: '' };

    const isOrgAdmin = p.ui.auth.isOrgAdmin();

    // eslint-disable-next-line eqeqeq
    const canEdit = isOrgAdmin || p.ui.auth.idUser == al.idUser;

    return (
      <div className="SubDetail">
        <div className="Title">{al.title}</div>
        <div className="Horizontal">
          <p className="Header">- {p.typeName}</p>
          {/* <p className="Header">{user.name}</p>
          <p className="Header">{' - ' + Localize('UserLevel' + user.level)}</p> */}
          <p className="Date">{getFormattedDateTime(al.date)}</p>
          <AccessLimit allowOrgAdmin>
            <p className="Date">{al.visible ? Localize('Visible') : Localize('NotVisible')}</p>
          </AccessLimit>
          <div className="Actions">
            {canEdit ? (
              <button className="Button Second" onClick={p.onAllegationEdited}>
                <Loc>Edit</Loc>
              </button>
            ) : null}
            {isOrgAdmin ? (
              <button className="Button Second" onClick={p.onAllegationRemoved}>
                <Loc>Delete</Loc>
              </button>
            ) : null}
          </div>
        </div>
        <div className="Text">{al.content}</div>
      </div>
    );
  }
}

class SanctionAllegations extends Component {
  render() {
    const p = this.props;

    return (
      <div className="Card Hero">
        <h3>
          <Loc>Sanction.Allegations</Loc>
        </h3>
        <div className="Content">
          {p.allegations &&
            p.allegations.map(al => (
              <SanctionAllegation
                key={al.id}
                typeName={p.typeName}
                allegation={al}
                onAllegationEdited={() => p.onAllegationEdited(al)}
                onAllegationRemoved={() => p.onAllegationRemoved(al)}
              />
            ))}
          <div className="Actions">
            <button className="Button Second" onClick={p.onAllegationAdded}>
              <Loc>Add new allegation</Loc>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class SanctionMatches extends Component {
  render() {
    const p = this.props;
    const { sanction } = p;
    if (!sanction) return null;

    const matches = sanction.sanctionMatches;

    return (
      <div className="Card Hero">
        <h3>
          <Loc>Sanction.Matches</Loc>
        </h3>
        <div className="PlayDay Content">
          <table className="">
            <tbody>
              {matches &&
                matches.map(m => {
                  return (
                    <MatchView key={m.id} match={m} idTournament={sanction.idTournament} displaySanctioned />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

@inject('store')
@observer
class SanctionDetails extends Component {
  @observable showAllegationDialog = false;
  @observable showConfirmDialog = false;
  @observable dialogProps = null;

  componentDidMount = () => {
    const p = this.props;
    const { idSanction } = p.match.params;
    p.store.sanctions.actions.get(idSanction);
  };

  @action addAllegationHandler = () => {
    this.showAllegationDialog = true;
    this.dialogProps = {
      action: this.allegationAddedHandler,
      data: {
        content: '',
      },
      isEditing: false,
    };
  };

  @action editAllegationHandler = allegation => {
    this.showAllegationDialog = true;
    this.dialogProps = {
      action: this.allegationEditedHandler,
      data: allegation,
      isEditing: true,
    };
  };

  @action removeAllegationHandler = allegation => {
    const msg = (
      <p>
        <Loc>Really delete?</Loc>?
      </p>
    );
    this.showConfirmation(msg, allegation, this.allegationDeletedHandler);
  };

  // __ Event handlers ______________________________________________________

  allegationAddedHandler = allegation => {
    this.showAllegationDialog = false;
    if (!allegation) return;

    this.props.store.sanctions.addAllegation(allegation).then(res => this.setState({}));
  };

  allegationEditedHandler = allegation => {
    this.showAllegationDialog = false;
    if (!allegation) return;

    this.props.store.sanctions.editAllegation(allegation).then(res => this.setState({}));
  };

  allegationDeletedHandler = allegation => {
    if (!allegation) return;

    this.props.store.sanctions.removeAllegation(allegation).then(res => this.setState({}));
  };

  // __ Confirm dialog _______________________________________________________

  @observable showConfirmDialog = false;
  confirmDialogProps = null;

  @action showConfirmation(msg, data, onAccept) {
    this.confirmDialogProps = { msg, data, onAccept };
    this.showConfirmDialog = true;
  }

  @action confirmDialogCloseHandler = button => {
    if (button === 'Yes') this.confirmDialogProps.onAccept(this.confirmDialogProps.data);

    this.showConfirmDialog = false;
  };

  render() {
    const p = this.props;
    const store = p.store.sanctions;
    const sanction = store.current;
    const isPlayerSanction = sanction && sanction.type !== 2;
    const sanctionTypeName = sanction ? (
      <Loc>{sanction.type === 2 ? 'Sanctions.Type.Team' : 'Sanctions.Type.Player'}</Loc>
    ) : (
      ''
    );

    return (
      <Spinner loading={store.loading}>
        {sanction ? (
          <Fragment>
            <SanctionDetailsCard sanction={sanction} editButtonHandler={p.editButtonHandler} />
            {isPlayerSanction && <SanctionMatches sanction={sanction} />}
            <SanctionAllegations
              typeName={sanctionTypeName}
              allegations={sanction.allegations}
              onAllegationAdded={this.addAllegationHandler}
              onAllegationEdited={this.editAllegationHandler}
              onAllegationRemoved={this.removeAllegationHandler}
            />

            <EditDialog show={this.showAllegationDialog}>
              <EditSanctionAllegationDialog {...this.dialogProps} />
            </EditDialog>

            <MessageBox
              buttons="YesNo"
              show={this.showConfirmDialog}
              onClose={this.confirmDialogCloseHandler}
            >
              {this.confirmDialogProps && this.confirmDialogProps.msg}
            </MessageBox>
          </Fragment>
        ) : null}
      </Spinner>
    );
  }
}

export default withRouter(SanctionDetails);
