import { toast } from 'react-toastify';

import axios from '../../axios';
import types from './actionTypes';
import { getOpErrorText } from '../../components/common/FormsMobx/Utils';

export const startLoadingSponsorsByidOrganization = idOrganization => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/sponsors/fororganization/${idOrganization}`);
      // console.log('data: ', data);
      if (data) dispatch(setSponsors(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startLoadingSponsorsByidTournament = idTournamnet => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/sponsors/fortournament/${idTournamnet}`);
      // console.log('data: ', data);
      if (data) dispatch(setSponsors(data));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startNewSponsor = sponsor => {
  return async (dispatch, getState) => {
    try {
      const { data: sponsorId } = await axios.post('/sponsors', sponsor);
      if (sponsorId) dispatch(addSponsor({ id: sponsorId, ...sponsor }));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUpdateSponsor = sponsor => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.put('/sponsors', sponsor);
      // console.log('data: ', data);
      if (data) dispatch(updateSponsor(sponsor));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startDeleteSponsor = sponsor => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post('/sponsors/delete', sponsor);
      //   console.log('data: ', data);
      if (data) dispatch(deleteSponsor(sponsor));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const startUploadSponsorImage = formData => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post('/upload', formData);
      // console.log('data: ', data);
      if (data) dispatch(updateImage(data.id, data.repositoryPath));

      // return error or swal
    } catch (err) {
      console.error(err);
      toast.error(getOpErrorText(err));
    }
  };
};

export const setSponsors = sponsors => ({
  type: types.sponsorsLoad,
  payload: sponsors,
});

export const addSponsor = sponsor => ({
  type: types.sponsorsAddNew,
  payload: sponsor,
});

export const updateSponsor = sponsor => ({
  type: types.sponsorsUpdate,
  payload: sponsor,
});

export const deleteSponsor = sponsor => ({
  type: types.sponsorsDelete,
  payload: sponsor,
});

export const updateImage = (sponsorId, imageUrl) => ({
  type: types.sponsorsImageUpload,
  payload: { id: sponsorId, imgUrl: imageUrl },
});

export const removeImage = sponsorId => ({
  type: types.sponsorsImageRemove,
  payload: sponsorId,
});
