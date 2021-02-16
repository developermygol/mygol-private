import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import Loc, { Localize } from '../../../../common/Locale/Loc';
import { getPlayerLink } from '../../../../helpers/Utils';
import InfoBox from '../../../../common/InfoBox';
import { findByIdInArray } from '../../../../helpers/Data';
import XCircle from 'react-feather/dist/icons/x-circle';
import MessageBox from '../../../../common/Dialogs/MessageBox';
import IconButton from '../../../../../formFields/IconButton';

const defaultProps = {
  match: null,
  canAdd: true,
  canEdit: true,
  canDelete: true,

  addMessage: '',
  listData: null,

  editHandler: null,
  addHandler: null,
  deleteHandler: null,
};
@inject('store')
@observer
class EventList extends Component {
  @observable showConfirmDialog = false;
  @observable dialogData = null;

  getTeam = (match, idTeam) => {
    const team = match.idHomeTeam === idTeam ? match.homeTeam : match.visitorTeam;
    return team;
  };

  getPlayer = (match, idTeam, idPlayer) => {
    const players = match.idHomeTeam === idTeam ? match.homePlayers : match.visitorPlayers;
    return findByIdInArray(players, idPlayer);
  };

  getTypeElement = event => {
    const { type } = event;
    return (
      <span className={'EventType Type' + type}>
        {Localize('MatchEventType' + type)}
        {event.type === 1002 && ' (' + event.intData1 + ')'}
      </span>
    );
  };

  getTypeElementWithTime = (type, minute, match) => {
    const isShootout = type === 80;
    return (
      <span className={'EventType Single Type' + type}>
        {Localize('MatchEventType' + type)}{' '}
        {isShootout &&
          `(${match.homeScore - match.visibleHomeScore} - ${
            match.visitorScore - match.visibleVisitorScore
          }) `}
        ({minute}")
      </span>
    );
  };

  addButtonHandler = () => {
    //redirect(this, this.props.match.url + '/events/new');
    const ac = this.props.addButtonHandler;
    if (ac) ac();
  };

  @action deleteEventHandler = ev => {
    this.showConfirmDialog = true;
    this.dialogData = ev;
  };

  eventDeletedHandler = button => {
    const p = this.props;
    this.showConfirmDialog = false;
    if (button !== 'Yes') return;

    const event = this.dialogData;
    if (p.deleteHandler) p.deleteHandler(event);
  };

  getPlayerRender = (match, idTeam, idPlayer, first) => {
    const player = this.getPlayer(match, idTeam, idPlayer);
    const { idTournament } = this.props.match.params;

    if (player)
      if (player.userData)
        if (first)
          return (
            <Fragment>
              <span className="ApparelNumber">{player.matchData.apparelNumber}</span>
              {/* <span>{getUploadsImg(player.userData.avatarImgUrl, player.userData.id, 'user', 'PlayerAvatar Mini')}</span> */}
              <span className="Name">{getPlayerLink(idTournament, player.matchData.idTeam, player)}</span>
            </Fragment>
          );
        else
          return (
            <Fragment>
              <span className="Name">{getPlayerLink(idTournament, player.matchData.idTeam, player)}</span>
              {/* <span>{getUploadsImg(player.userData.avatarImgUrl, player.userData.id, 'user', 'PlayerAvatar Mini')}</span> */}
              <span className="ApparelNumber">{player.matchData.apparelNumber}</span>
            </Fragment>
          );
      else return <span className="">{player.name + ' ' + player.surname}</span>;
  };

  render() {
    const match = this.props.listData;
    if (!match) return;

    const events = match ? match.events : null;

    return (
      <Fragment>
        {!match || !match.events || match.events.length === 0 ? (
          <Fragment>
            <InfoBox>
              <Loc>Match.NoEvents</Loc>
            </InfoBox>
            <button className="Button Center" onClick={this.addButtonHandler}>
              <Loc>{this.props.addMessage}</Loc>
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button className="Button Center" onClick={this.addButtonHandler}>
              <Loc>{this.props.addMessage}</Loc>
            </button>
            <div className="MatchEventsTable">
              {events.map(ev => {
                const first = ev.idTeam === match.idHomeTeam;
                const isMatchStart = ev.type === 1;

                return (
                  <div key={ev.id} className="Entry">
                    {ev.idTeam === 0 || isMatchStart ? (
                      <Fragment>
                        <div className="Wide" colSpan={5}>
                          {this.getTypeElementWithTime(ev.type, ev.matchMinute, match)}
                          <IconButton onClick={() => this.deleteEventHandler(ev)} icon="delete">
                            <XCircle size={15} />
                          </IconButton>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="EntryBox Left Delete">
                          {first ? (
                            <IconButton onClick={() => this.deleteEventHandler(ev)} icon="delete">
                              <XCircle size={20} />
                            </IconButton>
                          ) : null}
                        </div>
                        <div className="EntryBox Left Player">
                          {first ? this.getPlayerRender(match, ev.idTeam, ev.idPlayer, first) : null}
                        </div>
                        <div className="EntryBox Left Type">{first ? this.getTypeElement(ev) : null}</div>
                        <div className="EntryBox Central">
                          <div className="Time">
                            {/* <span className='Hour'>{getFormattedTime(ev.timeStamp)}</span> */}
                            <span className="Minute"> {ev.matchMinute}"</span>
                          </div>
                        </div>
                        <div className="EntryBox Right Type">{first ? ' ' : this.getTypeElement(ev)}</div>
                        <div className="EntryBox Right Player">
                          {first ? ' ' : this.getPlayerRender(match, ev.idTeam, ev.idPlayer, first)}
                        </div>
                        <div className="EntryBox Right Delete">
                          {first ? (
                            ' '
                          ) : (
                            <IconButton onClick={() => this.deleteEventHandler(ev)} icon="delete">
                              <XCircle size={20} />
                            </IconButton>
                          )}
                        </div>
                      </Fragment>
                    )}
                  </div>
                );
              })}
            </div>
            <MessageBox buttons="YesNo" show={this.showConfirmDialog} onClose={this.eventDeletedHandler}>
              {Localize('Event.Delete')}
            </MessageBox>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

EventList.defaultProps = defaultProps;

export default withRouter(EventList);
