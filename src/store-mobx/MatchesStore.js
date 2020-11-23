import { observable, action } from 'mobx';
import { createCrudActions } from './CrudActions';
import { updateByIdInArray, removeByIdInArray } from '../components/helpers/Data';
import { requestAsync, getInt } from '../components/helpers/Utils';
import axios from '../axios';
import { asyncAction } from 'mobx-utils';
import { hasCalendarFlagMask } from '../components/pages/Tournaments/Stages/Calendar/GroupCalendar';
import { toast } from 'react-toastify';
import { Localize } from '../components/common/Locale/Loc';

export default class MatchesStore {
  @observable current = null;
  @observable all = null;
  @observable loading = false;
  @observable error = null;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.actions = createCrudActions(this, '/matches', null, null, null, {
      afterGet: response => {
        // Need to have matchdata set to null (so the propoerty exists in the object) for players without it.
        // Otherwise, attendance is not updated correctly when set in
        this.appendMatchDataToPlayers(response.homePlayers);
        this.appendMatchDataToPlayers(response.visitorPlayers);
        return response;
      },
      postProcessAll: all => all,
    });
  }

  appendMatchDataToPlayers = players => {
    players.map(pl => {
      if (pl.matchData) return pl;
      pl.matchData = { status: 0 };
      return pl;
    });
  };

  @action setCurrent = match => {
    this.current = match;
  };

  getPlayDays = dates => {
    return requestAsync(this, axios.post, null, '/matches/dayswithmatches', dates).then(res => {
      if (!res) return;
      return res;
    });
  };

  getFilteredMatches = filterData => {
    return requestAsync(this, axios.post, null, '/matches/filtermatches', filterData).then(res => {
      if (!res) return;
      return res;
    });
  };

  getMatchesForReferee = () => {
    return requestAsync(this, axios.get, null, '/matches/forreferee').then(res => {
      if (!res) return;

      this.all = res;
    });
  };

  downloadMatchesExport = data => {
    return axios.post('matches/export', data, { responseType: 'blob' }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'matches.csv');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  adaptFormData = data => {
    data.idGroup = getInt(data.idGroup);
    data.idStage = getInt(data.idStage);
    data.idDay = getInt(data.idDay);
    data.idField = getInt(data.idField);
    data.idTournament = getInt(data.idTournament);
    data.idHomeTeam = getInt(data.idHomeTeam);
    data.idVisitorTeam = getInt(data.idVisitorTeam);

    return data;
  };

  @action createMatch = data => {
    // Same as edit happens here, have to add to special structure (matches nested in days).
    data = this.adaptFormData(data);

    return this.actions.create(data, null, null, false).then(res => {
      if (!res) return;

      // add match to its day.
      this.all.forEach(day => {
        if (data.idDay === day.id) {
          if (!day.matches) day.matches = observable([]);
          day.matches.push(res);
        }
      });

      // update group so it is marked as HasCalendar
      const groups = this.rootStore.groups.all;
      if (groups) {
        groups.forEach(group => {
          if (group.id === data.idGroup) {
            group.flags |= hasCalendarFlagMask;
          }
        });
      }

      return res;
    });
  };

  @action editMatch = data => {
    // Need a special action to edit in the right spot, because .all contains a special structure.
    // Just call actions.edit then find the right match by id inside all the playdays
    data = this.adaptFormData(data);

    return this.actions.edit(data, null, null, false).then(res => {
      if (!res) return;

      // Find in the matches arrays inside each day
      this.all &&
        this.all.forEach(day => {
          if (data.idDay === day.id) updateByIdInArray(day.matches, data.id, res);
        });

      return res;
    });
  };

  @action deleteMatch = data => {
    // Need a special action to delete in the right spot, because .all contains a special structure.
    // Just call actions.remove then find the right match by id inside all the playdays
    return this.actions.remove(data, null, null, false).then(res => {
      if (!res) return;

      // Find in the matches arrays inside each day
      this.all &&
        this.all.forEach(day => {
          if (data.idDay === day.id) {
            removeByIdInArray(day.matches, data.id);
          }
        });

      return res;
    });
  };

  setPlayerAttendance = asyncAction(function* (match, player, attended, state = this) {
    const idTeam = player.teamData.idTeam;

    const payload = {
      idPlayer: player.id,
      idUser: player.idUser,
      idTeam: idTeam,
      apparelNumber: player.teamData.apparelNumber,
      attended,

      idMatch: match.id,
      idDay: match.idDay,
    };

    const res = yield requestAsync(
      state,
      axios.post,
      'Player.AttendanceSetOk',
      '/matches/setplayerattendance',
      payload
    );
    if (!res) return;

    if (player.matchData) {
      player.matchData.status = attended ? 1 : 0;
      player.matchData.apparelNumber = player.teamData.apparelNumber;
    }
  });

  createEvent = asyncAction(function* (data) {
    const match = this.current;
    data.idDay = match.idDay;
    data.idMatch = match.id;

    const res = yield requestAsync(null, axios.post, 'Match.EventCreatedOk', '/matches/createevent', data);
    if (!res) return;

    // Update current match
    const m = res.match;
    match.homeScore = m.homeScore;
    match.visitorScore = m.visitorScore;
    match.status = m.status;

    match.events.unshift(res.event); // Add at the beginning

    if (res.newEvents && res.newEvents.length > 0) {
      res.newEvents.map(e => match.events.unshift(e));
      toast.warn(Localize('Sanctions.NewCardsFromEvent'));
    }

    if (res.newSanctions && res.newSanctions.length > 0) {
      this.addSanctions(res.newSanctions);
      toast.warn(Localize('Sanctions.NewSanctionsFromEvent'));
    }

    return res;
  });

  @action addSanctions = sanctions => {
    const store = this.rootStore.sanctions;

    if (!store.all) store.all = observable([]);

    store.all.push(...sanctions);
  };

  deleteEvent = asyncAction(function* (data) {
    const match = this.current;
    data.idDay = match.idDay;
    data.idMatch = match.id;

    const res = yield requestAsync(null, axios.post, 'Match.EventDeletedOk', '/matches/deleteevent', data);
    if (!res) return;

    // Update current match
    const m = res;
    match.homeScore = m.homeScore;
    match.visitorScore = m.visitorScore;
    match.status = m.status;

    removeByIdInArray(match.events, data.id);

    return res;
  });

  addDay = asyncAction(function* (day) {
    const res = yield requestAsync(null, axios.post, 'PlayDay.AddedOk', '/matches/addday', day);
    if (!res) return;

    yield this.actions.getAll('/matches/fortournament/' + day.idTournament);
  });

  deleteDay = asyncAction(function* (day) {
    const res = yield requestAsync(null, axios.post, 'PlayDay.DeletedOk', '/matches/deleteday', day);
    if (!res) return;

    yield this.actions.getAll('/matches/fortournament/' + day.idTournament);
  });
}
