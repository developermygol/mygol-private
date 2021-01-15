import types from '../actions/actionTypes';

const initalState = {
  seasons: [],
};

const organizationReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.seasonsLoad:
      return { ...state, seasons: action.payload };
    default:
      return state;
  }
};

export default organizationReducer;
