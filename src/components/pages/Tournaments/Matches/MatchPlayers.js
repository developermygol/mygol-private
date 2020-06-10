import React, { Component } from "react";
import Loc from "../../../common/Locale/Loc";
import MatchTeamPlayers from "./MatchTeamPlayers";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import ToggleButton from "../../../common/ToggleButton";

@observer
class MatchPlayers extends Component {
  @observable arePlayersVisible = true;

  @action switchVisibility = () => {
    this.arePlayersVisible = !this.arePlayersVisible;
  };

  handleChangePlayerAttendance = (player) => {
    const p = this.props;

    const status = player.matchData && player.matchData.status;
    const attends = status ? false : true;

    if (p.onChangePlayerAttendance)
      p.onChangePlayerAttendance(p.match, player, attends);
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
        <div style={{ display: this.arePlayersVisible ? "" : "none" }}>
          <div className="Legend">
            <p className="BottomSep10">
              <Loc>Legend</Loc>:
              <span className="ApparelNumber AttendsTrue">#</span>{" "}
              <Loc>Attends</Loc>
              <span className="ApparelNumber AttendsFalse">#</span>{" "}
              <Loc>DoesNotAttend</Loc>
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

export default MatchPlayers;
