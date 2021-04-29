import axios from '../../axios';

import { toast } from 'react-toastify';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

export const startGenerateplayersfile = req => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post('/players/generateplayersfile', req, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'players-badge.pdf');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const getPlayersInTournamentWithField = async tournamentId => {
  try {
    const { data } = await axios.get(`/players/fortournament/withfield/${tournamentId}`);
    return data;
  } catch (err) {
    console.error(err);
    toast.error(getOpErrorText(err));
  }
};
