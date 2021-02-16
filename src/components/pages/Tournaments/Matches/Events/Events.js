import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import InfoBox from '../../../../common/InfoBox';
import Loc, { Localize } from '../../../../common/Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { getUploadsImg } from '../../../../helpers/Utils';
import EventList from './EventList';
import DialogCrudForm from '../../../../common/FormsMobx/DialogCrudForm';

const defaultProps = {
  data: null,
  addAction: null,
  editAction: null,
  deleteAction: null,
};

const matchEventTypes = [
  1,
  10,
  11,
  12,
  15,
  16,
  17,
  18,
  13,
  30,
  31,
  32,
  33,
  34,
  40,
  41,
  42,
  50,
  61,
  62,
  63,
  64,
  65,
  70,
  80,
  100,
];

const fromVisualizeType = type => {
  switch (type) {
    case 1:
    case 10:
    case 11:
    case 12:
    case 13:
    case 15:
    case 16:
    case 17:
    case 18:
    case 100:
      return 'simple';
    case 80:
      return 'penaltyShootout';
    default:
      return 'complex';
  }
};

@observer
class Events extends Component {
  @observable players = [];

  state = {
    formType: 'simple',
  };

  getTypeOptions = () => {
    return matchEventTypes.map(m => ({ value: m, label: Localize('MatchEventType' + m) }));
  };

  getTeamOptions = () => {
    const m = this.props.data;

    return [
      {
        value: m.idHomeTeam,
        label: <TeamRadioLabel team={m.homeTeam} />,
        onChange: () => this.teamClickHandler(m.homePlayers),
      },
      {
        value: m.idVisitorTeam,
        label: <TeamRadioLabel team={m.visitorTeam} />,
        onChange: () => this.teamClickHandler(m.visitorPlayers),
      },
    ];
  };

  teamClickHandler = players => {
    this.players = players
      .filter(p => p.matchData.status === 1)
      .map(p => ({
        value: p.id,
        label: <PlayerRadioLabel player={p} />,
      }));
  };

  getMinuteOfLastEvent = events => {
    if (!events || events.length === 0) return 0;

    let max = 0;
    for (let i = 0; i < events.length; ++i) {
      const e = events[i];
      if (!e) continue;

      if (e.matchMinute > max) max = e.matchMinute;
    }

    return max;
  };

  render() {
    const match = this.props.data;
    const events = match ? match.events : null;
    const path = this.props.match.path;

    const isComplex = this.state.formType === 'complex';
    const isPenaltyShootout = this.state.formType === 'penaltyShootout';

    if (!events)
      return (
        <InfoBox>
          <Loc>Match.NoEvents</Loc>
        </InfoBox>
      );

    return (
      <div className="MatchEvents">
        <h4>
          <Loc>Events</Loc>
        </h4>
        <DialogCrudForm
          addMessage="Event.Create"
          editMessage="Edit event"
          canAdd={false}
          routePath={path + '/events'}
          listRoutePath={path}
          routeUrl={this.props.url + '/events'}
          routeIdParamName="idEvent"
          listComponent={EventList}
          addAction={this.props.addAction}
          editAction={this.props.editAction}
          deleteAction={this.props.deleteAction}
          listData={match}
          addData={{
            matchMinute: this.getMinuteOfLastEvent(events),
            type: 1,
            idTeam: 0,
            idPlayer: 0,
            intData1: 0,
            intData2: 0,
            idDay: events.idDay,
          }}
          fieldDefinition={[
            {
              fieldName: 'matchMinute',
              editRenderType: 'text',
              localizedLabel: 'MatchEventMinute',
              rules: 'required',
            },
            {
              fieldName: 'type',
              editRenderType: 'radio',
              localizedLabel: 'MatchEventType',
              selectOptions: this.getTypeOptions(),
              passProps: { additionalClass: 'MatchEventTypeField', valueBaseClassName: 'EventType Type' },
              onChange: value => this.setState({ formType: fromVisualizeType(parseInt(value, 10)) }),
              rules: 'required',
            },
            {
              fieldName: 'idTeam',
              editRenderType: 'radio',
              localizedLabel: 'MatchEventTeam',
              selectOptions: this.getTeamOptions(),
              passProps: { additionalClass: 'MatchEventTeamField' },
              hideInAdd: isComplex ? false : true,
            },
            { fieldName: 'idDay', showInList: false, canEdit: false },
            {
              fieldName: 'idPlayer',
              editRenderType: 'radio',
              localizedLabel: 'MatchEventPlayer',
              selectOptions: this.players,
              passProps: { additionalClass: 'MatchEventPlayerField', emptyOptionsMessage: '' },
              hideInAdd: isComplex ? false : true,
            },
            {
              fieldName: 'intData1',
              editRenderType: 'text',
              localizedLabel: 'PenaltyShootOutHome',
              hideInAdd: isPenaltyShootout ? false : true,
            },
            {
              fieldName: 'intData2',
              editRenderType: 'text',
              localizedLabel: 'PenaltyShootOutHome',
              hideInAdd: isPenaltyShootout ? false : true,
            },
            { fieldName: 'timeStamp', localizedLabel: 'TimeStamp', canEdit: false },
          ]}
        />
      </div>
    );
  }
}

const TeamRadioLabel = props => {
  const t = props.team;
  if (!t) return '--';

  return (
    <span className="">
      {getUploadsImg(t.logoImgUrl, t.id, 'team', 'TeamLogo')}
      <span>{t.name}</span>
    </span>
  );
};

const PlayerRadioLabel = props => {
  const p = props.player;

  return (
    <span className="PlayerOption">
      {/* {getUploadsImg(p.userData.avatarImgUrl, p.id, 'user', 'PlayerAvatar Mini')} */}
      <span className="ApparelNumber">{p.matchData.apparelNumber}</span>{' '}
      <span className="Name">{p.name + ' ' + p.surname}</span>
    </span>
  );
};

Events.defaultProps = defaultProps;

export default withRouter(Events);
