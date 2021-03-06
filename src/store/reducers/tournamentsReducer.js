import types from '../actions/actionTypes';

const initialState = {
  tournaments: [],
  activeTournament: null,
  activeTournamentDreamTeamRanking: null,
};

const tournamentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.tournamentsLoad:
      return { ...state, tournaments: action.payload };
    case types.tournamentActiveLoad:
      return { ...state, activeTournament: action.payload };
    case types.tournamentActiveDreamTeamRankingsLoad:
      return { ...state, activeTournamentDreamTeamRanking: action.payload };

    case types.tournamentSetSponsorData:
      return {
        ...state,
        tournaments: state.tournaments.map(t => {
          if (t.id === state.activeTournament.id) return { ...t, sponsorData: action.payload };
          return t;
        }),
        activeTournament: { ...state.activeTournament, sponsorData: action.payload },
      };
    case types.tournamentSetAppearanceData:
      return {
        ...state,
        activeTournament: { ...state.activeTournament, appearanceData: action.payload },
      };
    default:
      return state;
  }
};

export default tournamentsReducer;
