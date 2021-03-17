import { toast } from 'react-toastify';

import axios from '../../axios';
import types from './actionTypes';
import { createDefaultSectionSponsorData } from '../../components/helpers/Sponsors';
import { Localize } from '../../components/common/Locale/Loc';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

export const startLoadTournaments = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/tournaments');
      if (data) dispatch(setTournaments(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startLoadTournamentDreamTeamRankings = tournamentId => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/tournaments/dreamteamrankings/${tournamentId}`);

      if (data) {
        const rankingGroupByFieldPosition =
          data.length > 0
            ? data.reduce((accumulator, currentValue, currentIndex) => {
                if (currentIndex === 1) {
                  accumulator = { [accumulator.fieldPosition]: [accumulator] };
                  if (!accumulator[currentValue.fieldPosition]) {
                    accumulator[currentValue.fieldPosition] = [currentValue];
                  } else {
                    accumulator[currentValue.fieldPosition] = [
                      ...accumulator[currentValue.fieldPosition],
                      currentValue,
                    ];
                  }
                } else {
                  if (!accumulator[currentValue.fieldPosition]) {
                    accumulator[currentValue.fieldPosition] = [currentValue];
                  } else {
                    accumulator[currentValue.fieldPosition] = [
                      ...accumulator[currentValue.fieldPosition],
                      currentValue,
                    ];
                  }
                }
                return accumulator;
              })
            : [];

        dispatch(setActiveTournamentDreamTeamRanking(rankingGroupByFieldPosition));
      }

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUpdateTournamentsSequenceOrder = tournamentsSequence => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.put('/tournaments/saveorder', { tournamentsSequence });
      if (data) {
        toast.success(Localize('Tournaments.OrderSavedOk'));
        dispatch(setTournaments(data));
      }
      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUpdateTournamentAppearanceData = appearanceJsonString => {
  return async (dispatch, getState) => {
    const {
      tournaments: { activeTournament },
    } = getState();

    try {
      const { data } = await axios.put('/tournaments/appearance', {
        idTournament: activeTournament.id,
        appearanceJsonString,
      });
      if (data) {
        toast.success(Localize('Appearance.UpdatedOk'));
        dispatch(updateActiveTournamentAppearanceJSON(appearanceJsonString));
      }

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUpdateTorunamnetSponsorsData = (type, sectionConfig) => {
  return async (dispatch, getState) => {
    const {
      tournaments: { activeTournament },
    } = getState();
    const { sponsorData: sponsorDataString } = activeTournament;

    let sectionsJson;

    if (!sponsorDataString || sponsorDataString === '' || JSON.parse(sponsorDataString)) {
      sectionsJson = createDefaultSectionSponsorData();
      sectionsJson.sections[type] = sectionConfig;
    } else {
      sectionsJson = JSON.parse(sponsorDataString);
      sectionsJson.sections[type] = sectionConfig;
    }

    sectionsJson = JSON.stringify(sectionsJson);

    try {
      const { data } = await axios.put('/tournaments/sponsordata', {
        idTournament: activeTournament.id,
        sectionsJson,
      });
      if (data) dispatch(updateActiveTournamentSectionJSON(sectionsJson));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUpdateTournamentDreamTeam = dreamTeamJsonString => {
  return async (dispatch, getState) => {
    const {
      tournaments: { activeTournament },
    } = getState();

    try {
      const { data } = await axios.put('/tournaments/dreamteam', {
        idTournament: activeTournament.id,
        dreamTeamJsonString,
      });
      if (data) {
        toast.success(Localize('Tournaments.DreamTeamSavedOk'));
        dispatch(updateActiveTournamentDreamTeamJSON(dreamTeamJsonString));
      }

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const setTournaments = tournaments => ({
  type: types.tournamentsLoad,
  payload: tournaments,
});

export const setActiveTournament = tournament => ({
  type: types.tournamentActiveLoad,
  payload: tournament,
});

export const setActiveTournamentDreamTeamRanking = ranking => ({
  type: types.tournamentActiveDreamTeamRankingsLoad,
  payload: ranking,
});

export const updateActiveTournamentSectionJSON = sectionsJson => ({
  type: types.tournamentSetSponsorData,
  payload: sectionsJson,
});

export const updateActiveTournamentAppearanceJSON = appearnaceJson => ({
  type: types.tournamentSetAppearanceData,
  payload: appearnaceJson,
});

export const updateActiveTournamentDreamTeamJSON = dreamTeamJson => ({
  type: types.tournamentSetDreamTeam,
  payload: dreamTeamJson,
});
