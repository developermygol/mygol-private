import types from '../types/types';

const initialState = {
  sponsors: [],
};

const sponsorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.sponsorsLoad:
      return { ...state, sponsors: action.payload };
    case types.sponsorsAddNew:
      return { ...state, sponsors: [...state.sponsors, action.payload] };
    case types.sponsorsUpdate:
      return {
        ...state,
        sponsors: state.sponsors.map(sp => {
          if (sp.id === action.payload.id) return action.payload;
          return sp;
        }),
      };
    case types.sponsorsDelete:
      return { ...state, sponsors: state.sponsors.filter(sp => sp.id !== action.payload.id) };
    case types.sponsorsImageUpload:
      return {
        ...state,
        sponsors: state.sponsors.map(sp => {
          if (sp.id === action.payload.id) sp.imgUrl = action.payload.imgUrl;
          return sp;
        }),
      };
    case types.sponsorsImageRemove:
      return {
        ...state,
        sponsors: state.sponsors.map(sp => {
          if (sp.id === action.payload) sp.imgUrl = '';
          return sp;
        }),
      };
    default:
      return state;
  }
};

export default sponsorsReducer;
