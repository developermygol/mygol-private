import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loc from '../../common/Locale/Loc';

const SimpleMessageBox = ({ show, children, onConfirm, onCancel, type = 0 }) => {
  if (!show) return null;

  return (
    <div className="BackDrop" onClick={onCancel}>
      <div className="ModalWindow" onClick={e => e.stopPropagation()}>
        {children}
        <div className="ModalFooter">
          {type === 0 && (
            <React.Fragment>
              <button onClick={onConfirm} className="Button Button Active">
                <Loc>Yes</Loc>
              </button>
              <button onClick={onCancel} className="Button">
                <Loc>No</Loc>
              </button>
            </React.Fragment>
          )}
          {type === 1 && (
            <React.Fragment>
              <button onClick={onCancel} className="Button">
                <FontAwesomeIcon icon={faArrowLeft} /> <Loc>Back</Loc>
              </button>
              <button onClick={onConfirm} className="Button Button Active">
                <Loc>Save</Loc>
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleMessageBox;
