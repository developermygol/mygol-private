import types from '../types/types';

const initalState = {
  organizations: [],
  activeOrganization: null,
};

const organizationReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.organizationsLoad:
      return { ...state, organizations: action.payload };
    case types.organizationActiveLoad:
      return { ...state, activeOrganization: action.payload };
    case types.organizationSetSponsorData:
      return { ...state, activeOrganization: { ...state.activeOrganization, sponsorData: action.payload } };
    default:
      return state;
  }
};

export default organizationReducer;
