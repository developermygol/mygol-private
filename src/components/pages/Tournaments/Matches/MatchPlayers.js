import React, { Component } from 'react';
import { connect } from 'react-redux';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { startLoadingPlayerMatchNotices } from '../../../../store/actions/notices';

import Loc, { LocalizeI } from '../../../common/Locale/Loc';
import MatchTeamPlayers from './MatchTeamPlayers';
import ToggleButton from '../../../common/ToggleButton';
import { playerNotAcceptedNotices } from '../../../helpers/Notices';
import { toast } from 'react-toastify';

@observer
class MatchPlayers extends Component {
  @observable arePlayersVisible = true;

  @action switchVisibility = () => {
    this.arePlayersVisible = !this.arePlayersVisible;
  };

  handleChangePlayerAttendance = async player => {
    const p = this.props;

    const { id: idMatch, startTime } = this.props.match;
    const { activeTournament } = this.props.tournaments;
    const { idTeam } = player.teamData;

    await this.props.onLoadPlayerMatchNotices(player.id, idTeam, idMatch, activeTournament.id);

    const { acticePlayerMatchNotices } = this.props.notices;

    const notAcceptedNotices = playerNotAcceptedNotices(acticePlayerMatchNotices, startTime);

    if (notAcceptedNotices.length === 0) {
      const status = player.matchData && player.matchData.status;
      const attends = status ? false : true;

      if (p.onChangePlayerAttendance) p.onChangePlayerAttendance(p.match, player, attends);
    } else {
      const noticesNames = notAcceptedNotices.map(n => n.notice.name).join(',');
      toast.error(LocalizeI('Notices.AttendanceNoticesNotAccepted.Error', noticesNames));
    }
  };

  render() {
    const m = this.props.match;

    return (
      <div className="MatchPlayersTop">
        <h4>
          <Loc>Players</Loc>
          <ToggleButton
            className="Right"
            onClick={this.switchVisibility}
            value={this.arePlayersVisible}
            trueMsg="Hide"
            falseMsg="Show"
          />
        </h4>
        <div style={{ display: this.arePlayersVisible ? '' : 'none' }}>
          <div className="Legend">
            <p className="BottomSep10">
              <Loc>Legend</Loc>:<span className="ApparelNumber AttendsTrue">#</span> <Loc>Attends</Loc>
              <span className="ApparelNumber AttendsFalse">#</span> <Loc>DoesNotAttend</Loc>
            </p>
            <p>
              <small className="Hint">
                <Loc>Attend.Hint</Loc>
              </small>
            </p>
          </div>
          <div className="MatchPlayersContainer">
            <MatchTeamPlayers
              players={m.homePlayers}
              title="Match.HomeTeam"
              onChangePlayerAttendance={this.handleChangePlayerAttendance}
            />
            <MatchTeamPlayers
              players={m.visitorPlayers}
              title="Match.VisitorTeam"
              onChangePlayerAttendance={this.handleChangePlayerAttendance}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
  notices: state.notices,
});

const mapDispatchToProps = dispatch => ({
  onLoadPlayerMatchNotices: (idPlayer, idTeam, idMatch, idTournament) =>
    dispatch(startLoadingPlayerMatchNotices(idPlayer, idTeam, idMatch, idTournament)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchPlayers);
