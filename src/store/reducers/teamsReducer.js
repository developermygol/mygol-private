import types from '../actions/actionTypes';

const initalState = {
  teams: [],
};

const teamsReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.teamsLoad:
      return { ...state, teams: action.payload };
    default:
      return state;
  }
};

export default teamsReducer;
