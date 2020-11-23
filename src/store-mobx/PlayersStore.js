import { observable } from 'mobx';
import { createCrudActions } from './CrudActions';
import { asyncAction } from 'mobx-utils';
import {
  removeByIdInArray,
  updateByIdInArray,
  booleanToString,
  sortArrayById,
  findByIdInArray,
} from '../components/helpers/Data';
import { request } from './Store';
import axios from '../axios';

class PlayersStore {
  @observable current = null;
  @observable all = null;
  @observable loading = false;
  @observable error = null;

  currentId = 0;
  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.actions = createCrudActions(this, '/players', null, null, null, {
      afterGet: this.adaptPlayer,
      afterGetAll: players => {
        return sortArrayById(players.map(this.adaptPlayer));
      },
    });
    this.actions.create = null;
  }

  adaptPlayer = player => {
    // Needed for mobx react forms. See Issue #3
    const td = player.teamData;
    if (td) td.isTeamAdmin = booleanToString(td.isTeamAdmin);
    player.approved = booleanToString(player.approved);

    return player;
  };

  getUser = asyncAction(function* (idUser) {
    const result = yield request(this, axios.get, null, '/players/user/' + idUser);

    this.current = result;

    if (this.all) updateByIdInArray(this.all, result.id, result);
    else this.all = [result];

    return result;
  });

  create = asyncAction(function* (data, url = null, okMessage = null) {
    // This is special: it returns the new object instead of just the id of the
    // newly created object. It does this because we need the id of the user
    // created as part this call, as well as other player data that may be
    // initalized in the server (for instance, the status)

    const result = yield request(this, axios.post, okMessage || 'Item created ok', url || '/players', data);
    if (!result) return;

    if (this.all) this.all.push(result);
    else this.all = [result];

    return result;
  });

  unlinkTeam = asyncAction(function* (data, idTournament) {
    const idPlayer = data.id;
    const idTeam = data.teamData.idTeam;

    const result = yield request(
      this,
      axios.post,
      'PlayerRemovedFromTeamOk',
      '/players/unlink/' + idPlayer + '/' + idTeam
    );

    if (!result) return;

    removeByIdInArray(this.all, data.id);
  });

  invitePlayer = asyncAction(function* (idPlayer, idTeam, idTournament, inviteText) {
    const data = { idPlayer, idTeam, idTournament, inviteText };

    yield request(this, axios.post, 'PlayerInvitationSentOk', '/players/invite', data);
  });

  resendInvite = asyncAction(function* (idPlayer, idTeam, idTournament, inviteText) {
    const data = { idPlayer, idTeam, idTournament, inviteText };

    yield request(this, axios.post, 'PlayerInvitationSentOk', '/players/resendemail', data);
  });

  setTeamPlayerFlags = asyncAction(function* (idPlayer, idTeam, idTournament, status) {
    const data = { idPlayer, idTeam, idTournament, status };

    const res = yield request(
      this,
      axios.post,
      'TeamPlayer.StatusUpdatedOk',
      '/teams/updateplayerstatus',
      data
    );
    if (!res) return null;

    const player = findByIdInArray(this.all, idPlayer);
    if (!player) return null;

    player.teamData.status = status;

    return true;
  });

  setPlayerApprovedStatus = asyncAction(function* (idPlayer, approved) {
    const data = { idPlayer, approved };

    const res = yield request(
      this,
      axios.post,
      'Player.ApprovedStatusUpdatedOk',
      '/players/updateplayerapproved',
      data
    );
    if (!res) return null;

    const player = findByIdInArray(this.all, idPlayer);
    if (!player) return null;

    player.approved = approved;

    return true;
  });

  updatePlayerTacticPosition = asyncAction(function* (idPlayer, idTeam, idTacticPosition) {
    const data = { idPlayer, idTeam, idTacticPosition };

    const res = yield request(
      this,
      axios.put,
      'Player.tacticPositionUpdatedOk',
      '/players/updateplayertacticposition',
      data
    );
    if (!res) return null;

    const player = findByIdInArray(this.all, idPlayer);
    if (!player) return null;

    player.teamData.idTacticPosition = idTacticPosition;

    return true;
  });

  getPlayerExport = (idPlayer, idTeam, idTournament) => {
    return axios
      .get(`/players/export/${idPlayer}/${idTeam}/${idTournament}`, { responseType: 'blob' })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'player.json');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      });
  };

  uploadPalyer = async formData => {
    try {
      return await axios.post(`/players/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
}

export default PlayersStore;
