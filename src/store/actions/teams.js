import { toast } from 'react-toastify';

import axios from '../../axios';
import types from './actionTypes';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

export const startLoadTournamentTeams = () => {
  return async (dispatch, getState) => {
    try {
      const {
        tournaments: { activeTournament },
      } = getState();

      const { data } = await axios.get(`/tournaments/${activeTournament.id}/teams`);
      if (data) dispatch(setTournamentTeams(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startLoadTournamentTeam = idTeam => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/teams/${idTeam}`);
      if (data) dispatch(setTournamentTeam(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

const setTournamentTeams = tournamentTeams => ({
  type: types.teamsLoad,
  payload: tournamentTeams,
});

const setTournamentTeam = tournamentTeam => ({
  type: types.teamActiveLoad,
  payload: tournamentTeam,
});
