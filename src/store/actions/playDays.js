import { toast } from 'react-toastify';

import axios from '../../axios';
import types from './actionTypes';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

// export const startLoadingPlaysDays = () => {
//   return async (dispatch, getState) => {
//     try {
//         //

//       // return error or swal
//     } catch (err) {
//       // return error or swal
//       console.error(err);
//     }
//   };
// };

export const startgenerateAwards = (tournamentId, playDayId) => {
  return async (dispatch, getState) => {
    try {
      await axios.post(`/days/generateawards/${tournamentId}/${playDayId}`);
      dispatch(playDayGenerateAwards());
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

const playDayGenerateAwards = () => ({
  type: types.playDayGenerateAwards,
});
