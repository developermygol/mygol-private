import { observable, action } from 'mobx';
import { findByIdInArray, removeByIdInArray } from '../components/helpers/Data';
import { createCrudActions } from './CrudActions';
import { requestAsync } from '../components/helpers/Utils';
import axios from '../axios';
import { asyncAction } from 'mobx-utils';

class TeamsStore {
  @observable current = null;
  @observable all = null;
  @observable loading = false;
  @observable error = null;

  currentId = 0;
  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.actions = createCrudActions(this, '/teams');
  }

  @action
  setCurrent = id => {
    if (!id) {
      this.current = null;
      this.currentId = 0;
      return;
    }

    this.currentId = id;
    this.setCurrentWhenLoaded();
  };

  @action
  setCurrentWhenLoaded = () => {
    if (!this.currentId || !this.all) return;
    this.current = findByIdInArray(this.all, this.currentId);
  };

  getCreateUrl(idTournament) {
    return '/tournaments/' + idTournament + '/teams';
  }

  getListUrl(idTournament) {
    return '/tournaments/' + idTournament + '/teams';
  }

  getDeleteUrl(idTournament) {
    return '/tournaments/' + idTournament + '/team/delete';
  }

  getTeamsFilteredByTournament = idTournament => {
    return requestAsync(null, axios.get, null, '/tournaments/' + idTournament + '/teams');
  };

  getTeamsFilteredByTournaments = filterData => {
    return requestAsync(null, axios.post, null, '/tournaments/teamfilterbytournaments', filterData);
  };

  getTeamExport = (idTeam, idTournament) => {
    return axios.get(`/teams/export/${idTeam}/${idTournament}`, { responseType: 'blob' }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'team.json');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    });

    //return requestAsync(null, axios.get, null, `/teams/export/${idTeam}/${idTournament}`);
  };

  uploadTeam = async formData => {
    try {
      return await axios.post(`/teams/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  @action
  addTeamToTournament(idTournament, idTeam) {
    return requestAsync(null, axios.post, null, '/tournaments/' + idTournament + '/addteam/' + idTeam);
  }

  obliterate = asyncAction(function* (team) {
    const res = yield requestAsync(null, axios.post, 'Team.ObliteratedOk', '/teams/obliterate', team);

    if (res) {
      removeByIdInArray(this.all, team.id);
    }

    return res;
  });
}

export default TeamsStore;
