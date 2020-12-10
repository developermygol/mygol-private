import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Loc from '../../common/Locale/Loc';
import Upload from '../../common/Upload';
import { getUploadUrl } from '../../helpers/Utils';

const positionOptions = [
  { value: 1, label: <Loc>SponsorPosition1</Loc>, name: 'position' },
  { value: 2, label: <Loc>SponsorPosition2</Loc>, name: 'position' },
  { value: 3, label: <Loc>SponsorPosition3</Loc>, name: 'position' },
];

const SponsorForm = ({
  selectedSponor,
  uploadImage,
  removeImage,
  formValues,
  handleInputChange,
  cancel,
  save,
  update,
}) => {
  const { name, altText, url, rawCode, position, sequenceOrder } = formValues;
  const isSponsorSelected = selectedSponor && selectedSponor.id;

  return (
    <div className="SponsorForm">
      <h3>{isSponsorSelected ? <Loc>Edit sponsor</Loc> : <Loc>Create new sponsor</Loc>}</h3>
      {isSponsorSelected && (
        <div className="FormField">
          <label className="Label">
            <Loc>Sponsor.Image</Loc>
          </label>
          <small className="Hint">
            <Loc>Sponsor.Image.Hint</Loc>
          </small>
          <div className="UploadContainer">
            <Upload
              className={'Upload'}
              value={selectedSponor.imgUrl}
              onSuccess={uploadImage}
              onError={err => {
                console.log(err);
                // this.error = getOpErrorText(err);
              }}
              idObject={selectedSponor.id} // Send -2 to signal that the id will be filled later
              type={501}
            >
              {selectedSponor && selectedSponor.imgUrl && selectedSponor.imgUrl !== '' ? (
                <img src={getUploadUrl(selectedSponor.imgUrl)} alt="sponsor" />
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
              <p className="Button" onClick={removeImage}>
                <Loc>Upload.RemoveButton</Loc>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="FormField">
        <label className="Label forText" htmlFor="name">
          <Loc>Name</Loc>
        </label>
        <small className="Hint">
          <Loc>Sponsor.Name.Hint</Loc>
        </small>
        <input
          className="Text"
          type="text"
          name="name"
          label="name"
          placeholder=""
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <small className="ValidationError"></small>
      </div>
      <div className="FormField">
        <label className="Label forText" htmlFor="altText">
          <Loc>Description</Loc>
        </label>
        <small className="Hint">
          <Loc>Sponsor.Description.Hint</Loc>
        </small>
        <input
          className="Text"
          type="text"
          name="altText"
          label="altText"
          placeholder=""
          autoComplete="off"
          value={altText}
          onChange={handleInputChange}
        />
        <small className="ValidationError"></small>
      </div>
      <div className="FormField">
        <label className="Label forText" htmlFor="url">
          <Loc>Sponsor.Url</Loc>
        </label>
        <small className="Hint">
          <Loc>Sponsor.Url.Hint</Loc>
        </small>
        <input
          className="Text"
          type="text"
          name="url"
          label="url"
          placeholder=""
          autoComplete="off"
          value={url}
          onChange={handleInputChange}
        />
        <small className="ValidationError"></small>
      </div>
      <div className="FormField">
        <label className="Label forText" htmlFor="rawCode">
          <Loc>Sponsor.RawCode</Loc>
        </label>
        <small className="Hint">
          <Loc>Sponsor.RawCode.Hint</Loc>
        </small>
        <textarea
          className="TextArea"
          name="rawCode"
          placeholder=""
          value={rawCode}
          onChange={handleInputChange}
        />
        <small className="ValidationError"></small>
      </div>
      <div className="FormField">
        <label className="Label forText" htmlFor="position">
          <Loc>Sponsor.Position</Loc>
        </label>
        <small className="Hint">
          <Loc>Sponsor.Position.Hint</Loc>
        </small>
        <Select
          className="Select"
          options={positionOptions}
          // defaultValue={positionOptions[0]}
          value={positionOptions[position - 1]}
          name="position"
          onChange={handleInputChange}
        />
        <small className="ValidationError"></small>
      </div>
      <div className="FormField no-number-arrows">
        <label className="Label forText" htmlFor="sequenceOrder">
          <Loc>Sponsor.Sequence</Loc>
        </label>
        <small className="Hint">
          <Loc>Sponsor.Sequence.Hint</Loc>
        </small>
        <input
          className="Text"
          type="number"
          name="sequenceOrder"
          label="sequenceOrder"
          placeholder=""
          autoComplete="off"
          value={sequenceOrder}
          onChange={handleInputChange}
        />
        <small className="ValidationError"></small>
      </div>
      <button className="Button" onClick={cancel}>
        <FontAwesomeIcon icon={faArrowLeft} /> <Loc>Back</Loc>
      </button>
      <button
        className="Button Active SpinnerButtonIdle"
        onClick={isSponsorSelected ? () => update(selectedSponor.id) : save}
      >
        <Loc>Save</Loc>
      </button>
    </div>
  );
};

export default SponsorForm;
