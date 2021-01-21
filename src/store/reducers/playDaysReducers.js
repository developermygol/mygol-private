import types from '../actions/actionTypes';

const initalState = {
  playDays: [], // Current Tournament Playdays
};

const playDaysReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.playDaysLoad:
      return { ...state, playDays: action.payload };
    case types.playDayGenerateAwards:
      return state;
    default:
      return state;
  }
};

export default playDaysReducer;
