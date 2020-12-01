import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLoadOrganization, startUpdateOrgSponsorsData } from '../../../../store/actions/organizations';
import {
  setActiveTournament,
  startLoadTournaments,
  startUpdateTorunamnetSponsorsData,
} from '../../../../store/actions/tournaments';
import {
  startDeleteSponsor,
  startLoadingSponsorsByidTournament,
  startNewSponsor,
  startUpdateSponsor,
  updateImage,
  removeImage,
  startLoadingSponsorsByidOrganization,
} from '../../../../store/actions/sponsors';

import SponsorsGroups from './SponsorsGroups';
import SponsorForm from './SponsorForm';
import SponsorConfigForm from './SponsorConfigForm';
import Loc from '../../../common/Locale/Loc';
import { useForm } from '../../../../hooks/useForm';

const initialForm = {
  name: '',
  altText: '',
  url: '',
  imgUrl: null,
  rawCode: '',
  position: 1,
  sequenceOrder: '',
};

const Sponsors = ({ match, idOrganization = 0 }) => {
  const isTournamentSponsor = !idOrganization;
  const isOrganizationSponsor = idOrganization;

  let idTournament = 0;
  let configSections = null;

  if (isTournamentSponsor) {
    const { idTournament: stringIdTournament } = match.params;
    idTournament = parseInt(stringIdTournament, 10);
  }

  const { sponsors } = useSelector(state => state.sponsors);
  const { tournaments, activeTournament } = useSelector(state => state.tournaments);
  const { activeOrganization } = useSelector(state => state.organizations);

  const dispatch = useDispatch();

  const [isEditForm, setIsEditForm] = useState(false);
  const [isEditConfigForm, setIsEditConfigForm] = useState(false);
  const [configFormType, setConfigFormType] = useState();
  const [currentSponsorId, setCurrentSponsorId] = useState(null);

  const selectedSponor = sponsors.find(sp => sp.id === currentSponsorId);

  if (activeTournament && activeTournament.sponsorData && activeTournament.sponsorData !== '')
    configSections = JSON.parse(activeTournament.sponsorData);
  if (activeOrganization && activeOrganization.sponsorData && activeOrganization.sponsorData !== '')
    configSections = JSON.parse(activeOrganization.sponsorData);

  const [formValues, handleInputChange, reset] = useForm(initialForm);

  useEffect(() => {
    if (isOrganizationSponsor) {
      dispatch(startLoadOrganization());
      dispatch(startLoadingSponsorsByidOrganization(idOrganization));
    }
    if (isTournamentSponsor) {
      dispatch(startLoadTournaments());
      dispatch(startLoadingSponsorsByidTournament(idTournament));
    }
  }, [dispatch, idOrganization, idTournament]);

  useEffect(() => {
    if (isTournamentSponsor && tournaments && idTournament && tournaments.length > 0)
      dispatch(setActiveTournament(tournaments.find(t => t.id === idTournament)));
  }, [tournaments, idTournament]);

  const handleCreteNewSponsor = () => {
    setCurrentSponsorId(null);
    setIsEditForm(true);
  };

  const handleCancelSponsor = () => {
    setIsEditForm(false);
    reset(initialForm);
  };

  const handleSaveNewSponsor = () => {
    dispatch(startNewSponsor({ ...formValues, idOrganization, idTournament }));
    setIsEditForm(false);
    reset(initialForm);
  };

  const handleUpdateSponsor = sponsorId => {
    const hasImageToUpdate = selectedSponor && selectedSponor.imgUrl && selectedSponor.imgUrl !== '';
    if (hasImageToUpdate)
      dispatch(
        startUpdateSponsor({
          ...formValues,
          idOrganization,
          idTournament,
          id: sponsorId,
          imgUrl: selectedSponor.imgUrl,
        })
      );
    else dispatch(startUpdateSponsor({ ...formValues, idOrganization, idTournament, id: sponsorId }));
    setIsEditForm(false);
    reset(initialForm);
  };

  const handleDeleteSponsor = sponsor => dispatch(startDeleteSponsor(sponsor));

  const handleEditSponsor = sponsor => {
    reset(sponsor);
    setCurrentSponsorId(sponsor.id);
    setIsEditForm(true);
  };

  const handleUploadImage = ({ imageId, repositoryPath }) =>
    dispatch(updateImage(currentSponsorId, repositoryPath));

  const handleRemoveImage = () => dispatch(removeImage(currentSponsorId));

  const handleShowConfig = (type, config) => {
    setIsEditConfigForm(true);
    setConfigFormType(type);
  };

  const handleCancelSponsorConfig = () => {
    setIsEditConfigForm(false);
    setConfigFormType(undefined);
  };

  const handleSponsorConfigSave = sectionConfig => {
    if (isOrganizationSponsor) dispatch(startUpdateOrgSponsorsData(configFormType, sectionConfig));
    if (isTournamentSponsor) dispatch(startUpdateTorunamnetSponsorsData(configFormType, sectionConfig));
    handleCancelSponsorConfig();
  };

  return (
    <div className="SponsorsScreen">
      <h2>Sponsors</h2>
      {!isEditForm ? (
        <React.Fragment>
          <p className="ListHint">
            <Loc>Sponsors.Hint</Loc>
          </p>
          <div className="ActionBar">
            <button className="Button Active" onClick={handleCreteNewSponsor}>
              <Loc>Create new sponsor</Loc>
            </button>
          </div>
          <SponsorsGroups
            configSections={configSections}
            sponsors={sponsors}
            onDelete={handleDeleteSponsor}
            onEdit={handleEditSponsor}
            onConfig={handleShowConfig}
          />
        </React.Fragment>
      ) : (
        <SponsorForm
          selectedSponor={selectedSponor}
          uploadImage={handleUploadImage}
          removeImage={handleRemoveImage}
          formValues={formValues}
          handleInputChange={handleInputChange}
          cancel={handleCancelSponsor}
          save={handleSaveNewSponsor}
          update={handleUpdateSponsor}
        />
      )}
      <SponsorConfigForm
        isOrg={isOrganizationSponsor}
        type={configFormType}
        config={configSections}
        show={isEditConfigForm}
        // onClose={handleCancelSponsorConfig}
        save={handleSponsorConfigSave}
        cancel={handleCancelSponsorConfig}
      />
    </div>
  );
};

export default Sponsors;
