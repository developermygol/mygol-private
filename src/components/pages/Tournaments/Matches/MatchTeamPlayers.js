import React, { Component, Fragment } from "react";
import Loc, { Localize } from "../../../common/Locale/Loc";
import PlayerTable from "../../../pages/Players/PlayerTable";
import { withRouter } from "react-router-dom";
import { getPlayerLink } from "../../../helpers/Utils";
import { observer } from "mobx-react";

export default observer(
  withRouter(
    class MatchTeamPlayers extends Component {
      attendClickHandler = (player) => {
        const p = this.props;
        p.onChangePlayerAttendance(player);
      };

      render() {
        const p = this.props;
        const { players } = p;
        const { idTournament } = this.props.match.params;

        return (
          <div className="MatchPlayers">
            <h3>{Localize(p.title)}</h3>
            <div className="PlayerList">
              {players && players.length > 0 ? (
                <PlayerTable
                  players={players}
                  renderHandler={(pl) => {
                    const currentTeam = pl.teamData.idTeam;
                    const playerHasSanctionOnCurrentTeam =
                      pl.idSanction > 0 && currentTeam === pl.idSanctionTeam;
                    return (
                      <Fragment>
                        {getPlayerLink(idTournament, pl.teamData.idTeam, pl)}
                        {playerHasSanctionOnCurrentTeam && (
                          <span className="SanctionedPlayer">
                            {Localize("TeamPlayer.Sanctioned")}
                          </span>
                        )}
                      </Fragment>
                    );
                  }}
                  actionRenderHandler={(pl) => {
                    return (
                      <button
                        className="Button Second"
                        onClick={() => this.attendClickHandler(pl)}
                      >
                        <Loc>Set attendance</Loc>
                      </button>
                    );
                  }}
                />
              ) : (
                <Loc>Match.NoPlayers</Loc>
              )}
            </div>
          </div>
        );
      }
    }
  )
);
