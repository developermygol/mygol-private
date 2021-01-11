import React, { Component } from 'react';
import Spinner from '../../../common/Spinner/Spinner';
import MatchHeader from './MatchHeader';
import MatchReferees from './MatchReferees';
import MatchPlayers from './MatchPlayers';
import MatchEvents from './Events/Events';
import RefereeSelectorDialog from './SelectRefereeDialog';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { requestAsync } from '../../../helpers/Utils';
import axios from '../../../../axios';
import ErrorBox from '../../../common/ErrorBox';
import { redirect } from '../../../common/FormsMobx/Utils';
import MatchSanctions from './MatchSanctions';
import Loc from '../../../common/Locale/Loc';

@inject('store')
@observer
class MatchDetails extends Component {
  @observable showSelectReferee = false;

  updateMatch = () => {
    const idMatch = this.props.match.params.idMatch;

    const store = this.props.store.matches;
    store.actions.get(idMatch).then(res => store.setCurrent(res));
  };

  componentDidMount = () => {
    this.updateMatch();
  };

  handleDeleteMatch = data => {};

  handleEditMatch = () => {
    const { idTournament, idMatch } = this.props.match.params;
    redirect(this, `/tournaments/${idTournament}/matches/edit/${idMatch}`);
  };

  // handleSummonPlayers = () => {
  //     const match = this.props.store.matches.current;
  //     if (!match) return;

  //     const hp = match.homePlayers;
  //     if (hp && hp.length > 0) return; // Already scheduled

  //     requestAsync(null, axios.post, null, '/matches/schedule', match)
  //         .then(this.updateMatch());
  // }

  handleAddRefereeClick = () => {
    this.showSelectReferee = true;
  };

  handleAddReferee = data => {
    this.showSelectReferee = false;
    if (!data) return;

    const match = this.props.store.matches.current;

    const matchReferee = {
      idUser: data.referee.id,
      idMatch: match.id,
      role: data.role,
      referee: { ...data.referee },
    };

    const refers = match.referees;
    requestAsync(null, axios.post, 'Match.RefereeLinkedOk', '/matches/linkreferee', matchReferee).then(_ =>
      refers.push(matchReferee)
    );
  };

  handleDeleteReferee = data => {
    // confirmation needed?

    const match = this.props.store.matches.current;

    const matchReferee = {
      idUser: data.idUser,
      idMatch: match.id,
    };

    const refers = match.referees;
    requestAsync(null, axios.post, 'Match.RefereeUnlinkedOk', '/matches/unlinkreferee', matchReferee).then(
      _ => {
        const idx = refers.findIndex(r => r.idUser === matchReferee.idUser);
        if (idx > -1) refers.splice(idx, 1);
        this.forceUpdate();
      }
    );
  };

  handleAddEvent = data => {
    return this.props.store.matches.createEvent(data).then(res => {
      if (!res) return;

      redirect(this, this.props.match.url);
    });
  };

  handleEditEvent = data => {};

  handleDeleteEvent = data => {
    this.props.store.matches.deleteEvent(data);
  };

  handleChangePlayerAttendance = (match, player, attends) => {
    const store = this.props.store.matches;
    store.setPlayerAttendance(match, player, attends, null);

    this.setState({});
  };

  render() {
    const p = this.props;
    const store = p.store.matches;

    if (store.error) return <ErrorBox localizedMessage="Error.Loading" detail={store.error} />;

    const { idMatch } = p.match.params;
    const match = store.current;

    return (
      <div>
        <Spinner loading={store.loading}>
          {
            // eslint-disable-next-line eqeqeq
            match && match.id == idMatch ? (
              <div className="MatchDetails">
                <h3>
                  <Loc>Match.Details</Loc>
                </h3>
                <MatchHeader match={match} onEdit={this.handleEditMatch} />
                <MatchReferees
                  referees={match.referees}
                  addRefereeHandler={this.handleAddRefereeClick}
                  removeRefereeHandler={this.handleDeleteReferee}
                />
                <MatchPlayers match={match} onChangePlayerAttendance={this.handleChangePlayerAttendance} />
                <MatchEvents
                  data={match}
                  addAction={this.handleAddEvent}
                  editAction={this.handleEditEvent}
                  deleteAction={this.handleDeleteEvent}
                />
                <MatchSanctions data={match} />
              </div>
            ) : null
          }
        </Spinner>

        {this.showSelectReferee ? (
          <RefereeSelectorDialog
            show={this.showSelectReferee}
            from={match.startTime}
            duration={match.duration}
            closeHandler={this.handleAddReferee}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(MatchDetails);
