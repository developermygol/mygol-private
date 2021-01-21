import axios from '../../axios';

import { toast } from 'react-toastify';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

import types from './actionTypes';

export const startLoadSeasons = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/seasons');
      if (data) dispatch(setSeasons(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const setSeasons = seasons => ({
  type: types.seasonsLoad,
  payload: seasons,
});
