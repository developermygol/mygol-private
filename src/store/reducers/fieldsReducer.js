import types from '../actions/actionTypes';

const initialState = {
  fields: [],
};

const fieldsReucer = (state = initialState, action) => {
  switch (action.type) {
    case types.fieldsLoad:
      return { ...state, fields: action.payload };
    default:
      return state;
  }
};

export default fieldsReucer;
