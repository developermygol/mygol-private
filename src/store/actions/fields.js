import axios from '../../axios';
import types from './actionTypes';

export const startLoadingFields = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/fields');
      if (data) dispatch(setFields(data));

      // return error or swal
    } catch (err) {
      // return error or swal
      console.error(err);
    }
  };
};

export const setFields = fields => ({
  type: types.fieldsLoad,
  payload: fields,
});
