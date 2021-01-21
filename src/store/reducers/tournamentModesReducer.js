import types from '../actions/actionTypes';

const initalState = {
  tournamentModes: [],
};

const tournamnetModesReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.tournamentModesLoad:
      return { ...state, tournamentModes: action.payload };
    default:
      return state;
  }
};

export default tournamnetModesReducer;
