import React, { useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loc from '../../common/Locale/Loc';
import Slider from '../Slider/Slider';

const radioOptions = [
  { label: 'No', value: 0 },
  { label: 'Yes', value: 1 },
];

const SponsorConfigForm = ({ isOrg, type, config, show, onClose, cancel, save }) => {
  if (!show) return null;

  const currentConfig = config ? config.sections[type] : null;

  //retrive data from tournamnet sponsor
  const [inherit, setInherit] = useState(currentConfig ? currentConfig.inherit : true);
  const [adsBehavior, setAdsBehavior] = useState(currentConfig ? currentConfig.type : 0);
  const [hideSection, setHideSection] = useState(currentConfig ? currentConfig.hide : false);

  return (
    <div className="BackDrop" onClick={() => (onClose ? onClose('Cancel') : null)}>
      <div className="ModalWindow" onClick={e => e.stopPropagation()}>
        <div className="Card Form">
          <h3>
            <Loc>SponsorsSection.Title</Loc>
          </h3>
          <div className="Content">
            <form>
              {!isOrg && (
                <div className="FormField">
                  <label className="Label forText" htmlFor="inherit">
                    <Loc>SponsorsSection.Inherit</Loc>
                  </label>
                  <small className="Hint">
                    <Loc>SponsorsSection.Inherit.Hint</Loc>
                  </small>
                  <Slider
                    label=""
                    className="no-label"
                    checked={inherit}
                    onChange={() => setInherit(!inherit)}
                  />
                </div>
              )}
              <div className="FormField">
                <label className="Label forText" htmlFor="inherit">
                  <Loc>SponsorsSection.Type</Loc>
                </label>
                <small className="Hint">
                  <Loc>SponsorsSection.Type.Hint</Loc>
                </small>
                <div className="RadioItems">
                  {radioOptions.map(btn => (
                    <div className={`RadioItem Value ${btn.value}`} key={btn.value}>
                      <label className={'RadioLabel'}>
                        <input
                          className={'Radio'}
                          checked={btn.value === adsBehavior}
                          type="radio"
                          value={radioOptions[adsBehavior]}
                          onChange={e => setAdsBehavior(adsBehavior === 0 ? 1 : 0)}
                        />
                        <span className={'RadioContent'}>
                          <Loc>{`SponsorSectionType${btn.value}`}</Loc>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {!isOrg && (
                <div className="FormField">
                  <label className="Label forText" htmlFor="inherit">
                    <Loc>SponsorsSection.Hide</Loc>
                  </label>
                  <small className="Hint">
                    <Loc>SponsorsSection.Hide.Hint</Loc>
                  </small>
                  <Slider
                    label=""
                    className="no-label"
                    checked={hideSection}
                    onChange={() => setHideSection(!hideSection)}
                  />
                </div>
              )}
            </form>
          </div>
          <div className="Errors"></div>
          <div className="EditButtons">
            <button className="Button" onClick={cancel}>
              <FontAwesomeIcon icon={faArrowLeft} /> <Loc>Back</Loc>
            </button>
            <button
              className="Button Active SpinnerButtonIdle"
              onClick={() => save({ type: adsBehavior, inherit, hide: hideSection })}
            >
              <Loc>Save</Loc>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorConfigForm;
