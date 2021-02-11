import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useForm } from '../../../hooks/useForm';
import { getUploadUrl } from '../../helpers/Utils';

import { startUpdateOrgAppearanceData } from '../../../store/actions/organizations';
import { startUpdateTournamentAppearanceData } from '../../../store/actions/tournaments';
import appearanceReducer from './appearanceReducer';

import Upload from '../../common/Upload';
import ColorPickerForm from '../ColorPickerForm';
import AppearancePreview from './AppearancePreview';

import SimpleMessageBox from '../../shared/Message/SimpleMessageBox';
import Loc, { Localize } from '../../common/Locale/Loc';

const defaultColor = '#22194D';
const initialForm = {
  fontName: '',
  fontUrl: '',
  appearanceJSON: '',
};

const Appearance = ({ isOrg, isTournament }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [editJSON, setEditJSON] = useState('');

  const { activeOrganization } = useSelector(state => state.organizations);
  const { activeTournament } = useSelector(state => state.tournaments);

  const [stateAppearance, dispatchAppearance] = useReducer(appearanceReducer);

  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { fontName, fontUrl } = formValues;

  const dispatch = useDispatch();

  useEffect(() => {
    let appearanceDataString;

    if (isOrg) appearanceDataString = activeOrganization.appearanceData;
    if (isTournament && activeTournament) appearanceDataString = activeTournament.appearanceData;
    // const { appearanceData: appearanceDataString } = activeOrganization;
    const validDataString = appearanceDataString && appearanceDataString !== '';

    if (validDataString) {
      const appearanceData = JSON.parse(appearanceDataString);

      dispatchAppearance({ type: 'setAppearanceData', payload: appearanceData });
      setEditJSON(JSON.stringify(appearanceData, undefined, 4));

      const updatedForm = {
        fontName: appearanceData.fontName ? appearanceData.fontName : '',
        fontUrl: appearanceData.fontUrl ? appearanceData.fontUrl : '',
      };
      reset(updatedForm);
    } else {
      dispatchAppearance({ type: 'setAppearanceData', payload: '' });
      reset(initialForm);
    }
  }, [activeOrganization, activeTournament, dispatchAppearance]);

  const handleImageUploaded = img => {
    dispatchAppearance({ type: 'addImage', payload: { bgImageUrl: img.repositoryPath, bgUploadId: img.id } });
  };
  const handleImageRemove = () => dispatchAppearance({ type: 'removeImage' });

  const handleColorUpdate = (type, hex) => dispatchAppearance({ type, payload: hex });

  const handleOnSave = () => {
    let appearanceJsonString = '';
    const appearanceData = { ...stateAppearance };
    if (fontName !== '') appearanceData.fontName = fontName;
    if (fontUrl !== '') appearanceData.fontUrl = fontUrl;

    const appearanceDataIsEmpty = Object.keys(appearanceData).length === 0;
    if (!appearanceDataIsEmpty) appearanceJsonString = JSON.stringify(appearanceData);

    if (isOrg) dispatch(startUpdateOrgAppearanceData(appearanceJsonString));
    if (isTournament) dispatch(startUpdateTournamentAppearanceData(appearanceJsonString));
  };

  const handleOnSaveJSONConfig = () => {
    try {
      JSON.parse(editJSON);
      if (isOrg) dispatch(startUpdateOrgAppearanceData(editJSON));
      if (isTournament) dispatch(startUpdateTournamentAppearanceData(editJSON));
      setShowConfig(false);
    } catch (err) {
      toast.error(Localize('Appearance.Json.NotValid'));
    }
  };

  const handleShowConfirm = () => setShowConfirm(true);
  const handleShowConfig = () => setShowConfig(true);
  const handleUpdateToDefaultValues = () => {
    if (isOrg) dispatch(startUpdateOrgAppearanceData('{}'));
    if (isTournament) dispatch(startUpdateTournamentAppearanceData('{}'));
    reset(initialForm);
    setShowConfirm(false);
  };

  return (
    <div className="CardContainer">
      <h2>
        <Loc>Appearance</Loc>
      </h2>
      <div className="Card Hero">
        <h3>
          {isOrg ? <Loc>Appearance.DescTitle.Organization</Loc> : <Loc>Appearance.DescTitle.Tournament</Loc>}
        </h3>
        <div className="Content">
          <p className="Hint">
            {isOrg ? <Loc>Appearance.Hint.Organization</Loc> : <Loc>Appearance.Hint.Tournament</Loc>}
          </p>
          <div className="Appearance">
            <div className="Appearance__Col">
              <ColorPickerForm
                label={<Loc>Appearance.BackgroundColor</Loc>}
                hint={<Loc>Appearance.BackgroundColor.Hint</Loc>}
                value={stateAppearance && stateAppearance.bgColor ? stateAppearance.bgColor : defaultColor}
                onChange={({ hex }) => handleColorUpdate('updateBgColor', hex)}
              />
              <ColorPickerForm
                label={<Loc>Appearance.Color1</Loc>}
                hint={<Loc>Appearance.Color1.Hint</Loc>}
                value={stateAppearance && stateAppearance.color1 ? stateAppearance.color1 : defaultColor}
                onChange={({ hex }) => handleColorUpdate('updateColor1', hex)}
              />
              <ColorPickerForm
                label={<Loc>Appearance.Color2</Loc>}
                hint={<Loc>Appearance.Color2.Hint</Loc>}
                value={stateAppearance && stateAppearance.color2 ? stateAppearance.color2 : defaultColor}
                onChange={({ hex }) => handleColorUpdate('updateColor2', hex)}
              />
              <ColorPickerForm
                label={<Loc>Appearance.Color3</Loc>}
                hint={<Loc>Appearance.Color3.Hint</Loc>}
                value={stateAppearance && stateAppearance.color3 ? stateAppearance.color3 : defaultColor}
                onChange={({ hex }) => handleColorUpdate('updateColor3', hex)}
              />
            </div>
            <div className="Appearance__Col">
              <div className="FormField">
                <label className="Label">
                  <Loc>Appearance.BackgroundImage</Loc>
                </label>
                <small className="Hint">
                  <Loc>Appearance.BackgroundImage.Hint</Loc>
                </small>
                <div className="UploadContainer">
                  <Upload
                    className={'Upload'}
                    value={stateAppearance && stateAppearance.bgImageUrl ? stateAppearance.bgImageUrl : null}
                    onSuccess={handleImageUploaded}
                    onError={err => console.log(err)}
                    idObject={-2} // Send -2 to signal that the id will be filled later
                    type={230}
                  >
                    {stateAppearance && stateAppearance.bgImageUrl && stateAppearance.bgImageUrl !== '' ? (
                      <img src={getUploadUrl(stateAppearance.bgImageUrl)} alt="sponsor" />
                    ) : (
                      <div className="NoImage">
                        <h3>
                          <Loc>Upload.Image</Loc>
                        </h3>
                        <p>&nbsp;</p>
                        <p className="Button Active">
                          <Loc>UploadButton</Loc>
                        </p>
                      </div>
                    )}
                  </Upload>
                  <div className="Remove">
                    <p>
                      <Loc>Upload.DropImage</Loc>
                    </p>
                    <p className="Button" onClick={handleImageRemove}>
                      <Loc>Upload.RemoveButton</Loc>
                    </p>
                  </div>
                </div>
              </div>
              <div className="FormField">
                <label className="Label forText" htmlFor="fontName">
                  <Loc>Appearance.FontName</Loc>
                </label>
                <small className="Hint">
                  <Loc>Appearance.FontName.Hint</Loc>
                </small>
                <input
                  className="Text"
                  type="text"
                  name="fontName"
                  label="fontName"
                  placeholder=""
                  autoComplete="off"
                  value={fontName}
                  onChange={handleInputChange}
                />

                <small className="ValidationError"></small>
              </div>
              <div className="FormField">
                <label className="Label forText" htmlFor="fontUrl">
                  <Loc>Appearance.FontUrl</Loc>
                </label>
                <small className="Hint">
                  <Loc>Appearance.FontUrl.Hint</Loc>
                </small>
                <input
                  className="Text"
                  type="text"
                  name="fontUrl"
                  label="fontUrl"
                  placeholder=""
                  autoComplete="off"
                  value={fontUrl}
                  onChange={handleInputChange}
                />
                <small className="ValidationError"></small>
              </div>
              <AppearancePreview
                data={stateAppearance}
                name={activeOrganization.name}
                motto={activeOrganization.motto}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Actions">
        <button className="Button Active" onClick={handleOnSave}>
          <Loc>Save</Loc>
        </button>
        <button className="Button" onClick={handleShowConfig}>
          <Loc>Appearance.EditJson</Loc>
        </button>
        <button className="Button" onClick={handleShowConfirm}>
          <Loc>Appearance.ResetToDefault</Loc>
        </button>
      </div>
      <SimpleMessageBox
        show={showConfirm}
        onConfirm={handleUpdateToDefaultValues}
        onCancel={() => setShowConfirm(false)}
      >
        <p>
          <Loc>Appearance.Reset.AreYouSure</Loc>
        </p>
      </SimpleMessageBox>
      <SimpleMessageBox
        show={showConfig}
        onConfirm={handleOnSaveJSONConfig}
        onCancel={() => setShowConfig(false)}
        type={1}
      >
        <div className="Card Form">
          <div className="Content">
            <div className="FormField">
              <label className="Label forText" htmlFor="appearanceJSON">
                <Loc>Appearance.Json</Loc>
              </label>
              <textarea
                className="TextArea"
                name="appearanceJSON"
                placeholder=""
                value={editJSON}
                onChange={e => setEditJSON(e.target.value)}
              />

              <small className="ValidationError"></small>
            </div>
          </div>
        </div>
      </SimpleMessageBox>
    </div>
  );
};

export default Appearance;
