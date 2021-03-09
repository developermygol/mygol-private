import types from '../actions/actionTypes';

const initalState = {
  notices: [],
  activePlayerTeamAcceptedNotices: [],
  acticePlayerMatchNotices: [],
};

const noticesReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.noticesLoad:
      return { ...state, notices: action.payload };
    case types.playerTeamAcceptedNoticesLoad:
      return { ...state, activePlayerTeamAcceptedNotices: action.payload };
    case types.playerMatchNoticesLoad:
      return { ...state, acticePlayerMatchNotices: action.payload };
    case types.noticeAdd:
      return { ...state, notices: [...state.notices, action.payload] };
    case types.noticeUpdated:
      return {
        ...state,
        notices: state.notices.map(notice => {
          if (notice.id === action.payload.id) return action.payload;
          return notice;
        }),
      };
    case types.noticeRemoved:
      return { ...state, notices: state.notices.filter(notice => notice.id !== action.payload.id) };
    default:
      return state;
  }
};

export default noticesReducer;
