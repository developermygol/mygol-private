import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { requestAsync } from '../../helpers/Utils';
import Loc from '../../common/Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Spinner from '../../common/Spinner/Spinner';
import axios from '../../../axios';
import PlayerGridItem from './PlayerGridItem';
import DraggablePlayerGridItem from '../Tournaments/Teams/Tactics/DraggablePlayerGridItem';

const defaultProps = {
  players: null,
};

@observer
class PlayerGrid extends Component {
  @observable loading = true;
  @observable players = null;

  componentDidMount() {
    const idTeam = this.props.match.params.idTeam;
    requestAsync(this, axios.get, null, '/players/forteam/' + idTeam).then(res => {
      this.players = res;
    });
  }

  render() {
    const p = this.props;
    const players = this.players;
    if (players && players.length === 0) return <Loc>Team.NoPlayers</Loc>;

    return (
      <Spinner loading={this.loading}>
        <ul className="PlayerGrid">
          {players &&
            players.map(pl =>
              p.draggable ? (
                <DraggablePlayerGridItem key={pl.id} player={pl} />
              ) : (
                <PlayerGridItem key={pl.id} player={pl} />
              )
            )}
        </ul>
      </Spinner>
    );
  }
}

PlayerGrid.defaultProps = defaultProps;

export default withRouter(PlayerGrid);
