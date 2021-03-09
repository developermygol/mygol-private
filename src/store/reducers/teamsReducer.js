import types from '../actions/actionTypes';

const initalState = {
  teams: [],
  activeTeam: null,
};

const teamsReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.teamsLoad:
      return { ...state, teams: action.payload };
    case types.teamActiveLoad:
      return { ...state, activeTeam: action.payload };
    default:
      return state;
  }
};

export default teamsReducer;
