import React, { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { startLoadTournamentTeams } from '../../../../store/actions/teams';
import { startGenerateplayersfile } from '../../../../store/actions/players';
import badgeFormReducer, { badgesTypes } from './badgesFormReducer';

import CalendarFilter from '../../Calendar/CalendarFilter';
import MultipleChecks from '../../../shared/MultipleChecks';
import ColorPickerForm from '../../../shared/ColorPickerForm';
import Loc, { Localize } from '../../../common/Locale/Loc';
import Upload from '../../../common/Upload';
import { getOpErrorText } from '../../../common/FormsMobx/Utils';
import { getUploadUrl } from '../../../helpers/Utils';

/*
    "PlayerFiles.UserType0": "All", 
    "PlayerFiles.UserType1": "Players", 
    "PlayerFiles.UserType2": "Delegates", 
    "PlayerFiles.UserType3": "Trainers", 
    "PlayerFiles.UserType4": "Physiotherapists", 
*/
const radioPlayersValues = [0, 1, 2, 3, 4];
const radioSizeValues = [1, 2];
const initialfieldsChecks = [
  { value: true, name: 'PFF_TournamentName' },
  { value: true, name: 'PFF_PlayerId' },
  { value: true, name: 'PFF_PlayerName' },
  { value: true, name: 'PFF_PlayerSurname' },
  { value: true, name: 'PFF_PlayerFilePicture' },
  { value: true, name: 'PFF_QrCode' },
  { value: true, name: 'PFF_TeamName' },
  { value: true, name: 'PFF_TeamLogo' },
  { value: true, name: 'PFF_TeamApparelNumber' },
  { value: false, name: 'PFF_IdCardNumber' },
  { value: false, name: 'PFF_BirthDate' },
  { value: true, name: 'PFF_Role' },
  { value: false, name: 'PFF_OrganizationLogo' },
];

const teamDefault = { value: 0, label: <Loc>PlayerFiles.SelectTeam</Loc> };

const initialFormState = {
  playerType: 0,
  teamId: 0,
  size: 1,
  fields: initialfieldsChecks,
  textColor: '#000000',
  bgColor: '#FFFFFF',
  bgImage: null,
};

const Badges = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { teams } = useSelector(state => state.teams);
  const { activeTournament } = useSelector(state => state.tournaments);
  const [formState, formDispatch] = useReducer(badgeFormReducer, initialFormState);
  const { playerType, teamId, size, fields, textColor, bgColor, bgImage } = formState;

  useEffect(() => {
    const loadTournamentTeams = async () => {
      await dispatch(startLoadTournamentTeams());
      setLoading(false);
    };
    loadTournamentTeams();
  }, []);

  const handleTeamsOptionsReformat = teams => {
    return teams.map(team => ({ value: team.id, label: team.name }));
  };

  const handleTeamsOnSelect = ({ value }) => formDispatch({ type: badgesTypes.setFormTeam, payload: value });

  const handlePlayerTypeRadio = value =>
    formDispatch({ type: badgesTypes.setFromPlayerType, payload: value });

  const handleSizeRadio = value => formDispatch({ type: badgesTypes.setSize, payload: value });

  const handleFieldsCheck = check => {
    formDispatch({ type: badgesTypes.setFieldCheck, payload: { value: !check.value, name: check.name } });
  };

  const handleTextColorSelect = hex => formDispatch({ type: badgesTypes.setTextColor, payload: hex });
  const handleBgColorSelect = hex => formDispatch({ type: badgesTypes.setBgColor, payload: hex });

  const handleImageUploaded = img => {
    // img.repositoryPath, img.id
    formDispatch({ type: badgesTypes.setBgImage, payload: img.repositoryPath });
  };

  const handleImageRemove = () => {
    formDispatch({ type: badgesTypes.removeBgImage });
  };

  const handleDownloadPDF = async () => {
    if (validateBadges() === true) {
      setLoading(true);
      await dispatch(startGenerateplayersfile({ ...formState, tournamentId: activeTournament.id }));
      setLoading(false);
    }
  };

  const validateBadges = () => {
    if (teamId === 0) {
      toast.error(Localize('PlayerFiles.TeamRequired'));
      return false;
    }
    if (!fields.find(field => field.value === true)) {
      toast.error(Localize('PlayerFiles.SomeFieldRequired'));
      return false;
    }
    return true;
  };

  return (
    <div className="Badges">
      <h2>
        <Loc>PlayerFiles.Export</Loc>
      </h2>
      <div className="FormField">
        <label className="Label">
          <Loc>PlayerFiles.UserType</Loc>
        </label>
        <small className="Hint">
          <Loc>PlayerFiles.UserType.Hint</Loc>
        </small>
        <div className="RadioItems Horizontal">
          {radioPlayersValues.map(i => {
            return (
              <div key={i} className="RadioItem" onClick={() => handlePlayerTypeRadio(i)}>
                <input
                  className="Radio"
                  type="radio"
                  name={`ReportType${i}`}
                  value={i}
                  checked={playerType === i}
                  readOnly
                />
                <span className="RadioContent">
                  <Loc>{`PlayerFiles.UserType${i}`}</Loc>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="FormField">
        <label className="Label">
          <Loc>Team</Loc>
        </label>
        <CalendarFilter
          name="teamId"
          defaultValue={teamDefault}
          options={handleTeamsOptionsReformat(teams)}
          onChange={handleTeamsOnSelect}
          isLoading={loading}
        />
      </div>
      <div className="Row">
        <div className="Column2">
          <div className="FormField">
            <label className="Label">
              <Loc>PlayerFiles.ReportType</Loc>
            </label>
            <small className="Hint">{/* <Loc>PlayerFiles.ReportType.Hint</Loc> */}</small>
            <div className="RadioItems Horizontal">
              {radioSizeValues.map(i => {
                return (
                  <div key={i} className="RadioItem" onClick={() => handleSizeRadio(i)}>
                    <input
                      className="Radio"
                      type="radio"
                      name={`userType${i}`}
                      value={i}
                      checked={size === i}
                      readOnly
                    />
                    <span className="RadioContent">
                      <Loc>{`PlayerFiles.ReportType${i}`}</Loc>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <MultipleChecks
            label="PlayerFile.Fields"
            hint="PlayerFile.Fields.Hint"
            checks={fields}
            handleChange={handleFieldsCheck}
          />
        </div>
        <div className="Column2">
          <ColorPickerForm
            label={<Loc>PlayerFiles.TextColor</Loc>}
            value={textColor}
            onChange={({ hex }) => handleTextColorSelect(hex)}
          />
          <ColorPickerForm
            label={<Loc>PlayerFiles.BackgroundColor</Loc>}
            value={bgColor}
            onChange={({ hex }) => handleBgColorSelect(hex)}
          />
          <div className="FormField">
            <label className="Label">
              <Loc>PlayerFiles.BackgroundImage</Loc>
            </label>
            <div className="UploadContainer">
              <Upload
                className={'Upload'}
                value={bgImage}
                onSuccess={handleImageUploaded}
                onError={err => {
                  console.log(err);
                  toast.error(getOpErrorText(err));
                }}
                idObject={-2} // Send -2 to signal that the id will be filled later
                type={400}
              >
                {bgImage ? (
                  <img src={getUploadUrl(bgImage)} alt="badge" />
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
        </div>
      </div>
      <div className="Hero">
        <button className="Button SpinnerButtonIdle" disabled={loading} onClick={handleDownloadPDF}>
          <Loc>PlayerFiles.GeneratePdf</Loc>
        </button>
      </div>
    </div>
  );
};

export default Badges;
