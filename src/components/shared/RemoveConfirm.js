import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loc from '../common/Locale/Loc';

const RemoveConfirm = ({ children, confirm, cancel }) => {
  return (
    <div className="BackDrop" onClick={cancel}>
      <div className="ModalWindow" onClick={e => e.stopPropagation()}>
        {children}
        <div className="ModalFooter">
          <button onClick={cancel} className="Button">
            <FontAwesomeIcon icon={faArrowLeft} /> <Loc>Back</Loc>
          </button>
          <button onClick={confirm} className="Button Button Active">
            <Loc>Delete</Loc>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveConfirm;
