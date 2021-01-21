import { toast } from 'react-toastify';

import axios from '../../axios';
import types from './actionTypes';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

export const startLoadTournamentModes = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/tournamentmodes');
      if (data) dispatch(setTournamentModes(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

const setTournamentModes = tournamentModes => ({
  type: types.tournamentModesLoad,
  payload: tournamentModes,
});
