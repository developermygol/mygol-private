import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import SoccerField from './SoccerField';
import InfoBox from '../../../../common/InfoBox';
import Loc from '../../../../common/Locale/Loc';
import { requestAsync } from '../../../../helpers/Utils';
import axios from '../../../../../axios';
import { findByIdInArray } from '../../../../helpers/Data';
import PlayerGrid from '../../../Players/PlayerGrid';
import { action } from '../../../../../../node_modules/mobx';

@inject('store')
@observer
class TacticPlayerDragAndDrop extends Component {
  @observable players = null;

  state = {
    players: null,
  };

  componentDidMount = () => {
    this.props.store.tactics.fetchOnce();

    const idTeam = this.props.match.params.idTeam;
    requestAsync(this, axios.get, null, '/players/forteam/' + idTeam).then(res => {
      this.players = res;
      this.setState({ players: res });
    });
  };

  // @action playerDroppedHandler = async (player, source, destinationMarker, position) => {
  @action playerDroppedHandler = async (idPlayer, idTeam, idTacticPosition) => {
    // console.log('player', player.name, 'desde', source && source.name, 'hasta', destinationMarker, position);

    // Rerfresh players info after update
    await this.props.store.players.updatePlayerTacticPosition(idPlayer, idTeam, idTacticPosition);
    const response = await requestAsync(this, axios.get, null, '/players/forteam/' + idTeam);

    this.players = response;
    this.setState(state => ({ players: response }));

    // if (!source) {
    // const playerGroup = {
    //     idTournament: this.getTournament(),
    //     idplayer: player.id,
    //     idStage: destinationMarker.idStage,
    //     idGroup: destinationMarker.id,
    //     sequenceOrder: position
    // };
    // this.props.store.playerGroups.actions.create(playerGroup, null, 'playerAddedToGroup');
    // } else {
    // moving an existing player to a different location, have to update instead of adding
    // }
  };

  playerCanDrop = (player, marker) => {
    // const playerAlready =
    //     this.props.store.playerGroups.all
    //         .filter((tg => tg.idStage === group.idStage && tg.idplayer === player.id));

    // return playerAlready.length === 0;
    return true;
  };

  callbacks = {
    playerCanDrop: this.playerCanDrop,
    playerDropped: this.playerDroppedHandler,
  };

  render() {
    const p = this.props;

    const numPlayers = p.store.tournaments.teamSize;
    if (!numPlayers)
      return (
        <InfoBox>
          <Loc>Tactic.NoForNumPlayers</Loc>
        </InfoBox>
      );

    const team = p.store.teams.current;
    if (!team)
      return (
        <InfoBox>
          <Loc>Error.TeamData</Loc>
        </InfoBox>
      );

    const data = p.store.tactics.data;
    if (!data)
      return (
        <InfoBox>
          <Loc>Error.TacticData</Loc>
        </InfoBox>
      );

    const allTactics = data.tactics;
    const selectedTactic = findByIdInArray(allTactics, team.idTactic);
    if (!selectedTactic)
      return (
        <InfoBox>
          <Loc>Error.NoTactic</Loc>
        </InfoBox>
      );

    return (
      <div>
        <SoccerField
          players={this.state.players}
          positions={selectedTactic.positions}
          callbacks={this.callbacks}
        />
        <PlayerGrid draggable />
      </div>
    );
  }
}

export default TacticPlayerDragAndDrop;
