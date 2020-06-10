import React, { Component } from "react";
import Loc from "../../common/Locale/Loc";
import { getPlayerIdPicture } from "../../helpers/Utils";
import { observer } from "mobx-react";

const defaultProps = {
  players: null,
  renderHandler: (pl) => pl.name + " " + pl.surname,
};

@observer
class PlayerTable extends Component {
  isAttending = (pl) => {
    const v = pl && pl.matchData && pl.matchData.status === 1;
    return v;
  };

  render() {
    const p = this.props;
    const players = p.players;
    if (!players || players.length === 0)
      return (
        <div>
          <Loc>Search.NoPlayerResults</Loc>
        </div>
      );

    return (
      <table>
        <tbody>
          {players.map((pl) => (
            <tr key={pl.id}>
              {pl.teamData ? (
                <td>
                  <span
                    className={
                      "ApparelNumber" +
                      (this.isAttending(pl) ? " AttendsTrue" : " AttendsFalse")
                    }
                  >
                    {pl.teamData.apparelNumber}
                  </span>
                </td>
              ) : (
                <td>--</td>
              )}
              <td>
                {getPlayerIdPicture(pl.idPhotoImgUrl, "PlayerAvatar Mini")}
              </td>
              <td>{p.renderHandler(pl)}</td>
              {p.actionRenderHandler ? (
                <td>{p.actionRenderHandler(pl)}</td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

PlayerTable.defaultProps = defaultProps;

export default PlayerTable;
