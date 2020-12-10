import axios from '../../axios';
import types from './actionTypes';
import { toast } from 'react-toastify';

import { createDefaultSectionSponsorData } from '../../components/helpers/Sponsors';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';
import { Localize } from '../../components/common/Locale/Loc';

export const startLoadOrganization = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/organization');
      if (data) dispatch(setActiveOrganization(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUpdateOrgAppearanceData = appearanceJsonString => {
  return async (dispatch, getState) => {
    const {
      organizations: { activeOrganization },
    } = getState();

    try {
      const { data } = await axios.put('/organization/appearance', {
        idOrganization: activeOrganization.id,
        appearanceJsonString,
      });
      if (data) {
        toast.success(Localize('Appearance.UpdatedOk'));
        dispatch(updateActiveOrgAppearanceJSON(appearanceJsonString));
      }

      // return error or swal
    } catch (err) {
      // return error or swal
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUpdateOrgSponsorsData = (type, sectionConfig) => {
  return async (dispatch, getState) => {
    const {
      organizations: { activeOrganization },
    } = getState();
    const { sponsorData: sponsorDataString } = activeOrganization;

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
      const { data } = await axios.put('/organization/sponsordata', {
        idOrganization: activeOrganization.id,
        sectionsJson,
      });
      if (data) dispatch(updateActiveOrgSectionJSON(sectionsJson));

      // return error or swal
    } catch (err) {
      toast.error(getOpErrorText(err));
      console.error(err);
    }
  };
};

export const setOrganizations = organizations => ({
  type: types.organizationsLoad,
  payload: organizations,
});

export const setActiveOrganization = organization => ({
  type: types.organizationActiveLoad,
  payload: organization,
});

export const updateActiveOrgSectionJSON = sectionsJson => ({
  type: types.organizationSetSponsorData,
  payload: sectionsJson,
});

export const updateActiveOrgAppearanceJSON = appearnaceJson => ({
  type: types.organizationSetAppearanceData,
  payload: appearnaceJson,
});
