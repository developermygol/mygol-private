import axios from '../../axios';
import { toast } from 'react-toastify';

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
      // return error or swal
      console.error(err);
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
      // return error or swal
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
      // return error or swal
      console.error(err);
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

export const updateActiveTournamentSectionJSON = sectionsJson => ({
  type: types.tournamentSetSponsorData,
  payload: sectionsJson,
});

export const updateActiveTournamentAppearanceJSON = appearnaceJson => ({
  type: types.tournamentSetAppearanceData,
  payload: appearnaceJson,
});
