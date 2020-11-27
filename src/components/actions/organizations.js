import axios from '../../axios';
import types from '../types/types';
import { createDefaultSectionSponsorData } from '../helpers/Sponsors';

export const startLoadOrganization = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/organization');
      if (data) dispatch(setActiveOrganization(data));

      // return error or swal
    } catch (err) {
      // return error or swal
      console.error(err);
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
      // return error or swal
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
