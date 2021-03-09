import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Slider from '../../../shared/Slider/Slider';
import NoticeFormFields from './NoticesFormFields';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NoticesForm = ({ isEdit, formValues, handleInputChange, handleEnabled, errors, goBack, save }) => {
  const {
    name,
    text,
    confirmationText1,
    confirmationText2,
    confirmationText3,
    acceptText,
    hoursInAdvance,
    enabled,
  } = formValues;

  return (
    <div className="Card Form">
      <h3>{isEdit ? <Loc>Notices.Edit.Title</Loc> : <Loc>Notices.Add.Title</Loc>}</h3>
      <div className="Content">
        <NoticeFormFields
          type="text"
          name="name"
          label={Localize('Notices.Title.Label')}
          value={name}
          change={handleInputChange}
        />
        <NoticeFormFields
          type="textarea"
          name="text"
          label={Localize('Notices.Text.Label')}
          value={text}
          change={handleInputChange}
        />
        <NoticeFormFields
          type="text"
          name="confirmationText1"
          label={Localize('Notices.Text1.Label')}
          hint={Localize('Notices.Text1.Hint')}
          value={confirmationText1}
          change={handleInputChange}
        />
        <NoticeFormFields
          type="text"
          name="confirmationText2"
          label={Localize('Notices.Text2.Label')}
          value={confirmationText2}
          change={handleInputChange}
        />
        <NoticeFormFields
          type="text"
          name="confirmationText3"
          label={Localize('Notices.Text3.Label')}
          value={confirmationText3}
          change={handleInputChange}
        />
        <NoticeFormFields
          type="text"
          name="acceptText"
          label={Localize('Notices.ButtonText.Label')}
          value={acceptText}
          change={handleInputChange}
        />
        <NoticeFormFields
          type="text"
          name="hoursInAdvance"
          label={Localize('Notices.Time.Label')}
          hint={Localize('Notices.Time.Hint')}
          value={hoursInAdvance}
          change={handleInputChange}
        />
        <Slider onChange={handleEnabled} checked={enabled} label={Localize('Notices.Active.Label')} />
        <div className="Errors">
          {errors.map(err => (
            <p key={uuidV4()} className="Error">
              {err}
            </p>
          ))}
        </div>
        <div className="EditButtons">
          <button className="Button" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> <Loc>Back</Loc>
          </button>
          <button className="Button Active SpinnerButtonIdle" onClick={save}>
            <Loc>Save</Loc>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticesForm;
