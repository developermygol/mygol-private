import { toast } from 'react-toastify';

import axios from '../../axios';
import types from './actionTypes';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

export const startLoadingFields = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/fields');
      if (data) dispatch(setFields(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const setFields = fields => ({
  type: types.fieldsLoad,
  payload: fields,
});
