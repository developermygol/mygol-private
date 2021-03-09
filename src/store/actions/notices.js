import { toast } from 'react-toastify';

import axios from '../../axios';
import types from './actionTypes';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';
import { Localize } from '../../components/common/Locale/Loc';

export const startLoadingNotices = () => {
  return async (dispatch, getState) => {
    try {
      const {
        tournaments: { activeTournament },
      } = getState();
      const { data } = await axios.get(`/notices/fortournament/${activeTournament.id}`);
      dispatch(setNotices(data));
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startLoadingPlayerTeamAcceptedNotices = (idPlayer, idTeam, idTournament) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `/matches/playerteamacceptednotices/${idPlayer}/${idTeam}/${idTournament}`
      );
      dispatch(setPlayerTeamAcceptedNotices(data));
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startLoadingPlayerMatchNotices = (idPlayer, idTeam, idMatch, idTournament) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `/matches/playermatchnotices/${idPlayer}/${idTeam}/${idMatch}/${idTournament}`
      );
      dispatch(setPlayerMatchNotices(data));
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const createNotice = notice => {
  return async (dispatch, getState) => {
    try {
      const {
        tournaments: { activeTournament },
      } = getState();
      await axios.post(`/notices`, { ...notice, idTournament: activeTournament.id });
      dispatch(noticeAdd(notice));
      toast.success(Localize('Item created ok'));
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const editNotice = notice => {
  return async (dispatch, getState) => {
    try {
      const {
        tournaments: { activeTournament },
      } = getState();
      await axios.put(`/notices`, { ...notice, idTournament: activeTournament.id });
      dispatch(noticeUpdated(notice));
      toast.success(Localize('Item updated ok'));
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const removeNotice = notice => {
  return async (dispatch, getState) => {
    try {
      const {
        tournaments: { activeTournament },
      } = getState();
      await axios.post(`/notices/delete`, { ...notice, idTournament: activeTournament.id });
      dispatch(noticeRemoved(notice));
      toast.success(Localize('Item deleted ok'));
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

const setNotices = notices => ({
  type: types.noticesLoad,
  payload: notices,
});

const setPlayerTeamAcceptedNotices = notices => ({
  type: types.playerTeamAcceptedNoticesLoad,
  payload: notices,
});

const setPlayerMatchNotices = notices => ({
  type: types.playerMatchNoticesLoad,
  payload: notices,
});

const noticeAdd = notice => ({
  type: types.noticeAdd,
  payload: notice,
});

const noticeUpdated = notice => ({
  type: types.noticeUpdated,
  payload: notice,
});

const noticeRemoved = notice => ({
  type: types.noticeRemoved,
  payload: notice,
});
