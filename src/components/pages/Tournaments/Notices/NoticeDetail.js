import React, { useState } from 'react';
import Edit3 from 'react-feather/dist/icons/edit-3';
import XCircle from 'react-feather/dist/icons/x-circle';

import IconButton from '../../../../formFields/IconButton';
import Loc, { LocalizeI } from '../../../common/Locale/Loc';
import RemoveConfirm from '../../../shared/RemoveConfirm';

const NoticeDetail = ({ notice, edit, remove }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { name, enabled, hoursInAdvance } = notice;

  const handleShowConfirm = () => setShowConfirm(!showConfirm);
  const handleRemove = () => {
    handleShowConfirm();
    remove(notice);
  };

  return (
    <React.Fragment>
      <tr>
        <td className="DataTableCell">{name}</td>
        <td className="DataTableCell">{hoursInAdvance}</td>
        <td className="DataTableCell">
          {enabled ? (
            <span style={{ color: 'green', fontWeight: 600 }}>
              <Loc>Yes</Loc>
            </span>
          ) : (
            <span style={{ color: 'red', fontWeight: 600 }}>
              <Loc>No</Loc>
            </span>
          )}
        </td>
        <td className="DataTableCell">
          <div className="ListActionButtons">
            <IconButton className="Button Third" onClick={() => edit(notice)}>
              <Edit3 size={20} />
            </IconButton>
            <IconButton className="Button Third" onClick={handleShowConfirm}>
              <XCircle size={20} />
            </IconButton>
          </div>
        </td>
      </tr>
      {showConfirm && (
        <RemoveConfirm cancel={handleShowConfirm} confirm={handleRemove}>
          <p className="ModalHead">
            <Loc>Notices.Confirm.Remove.Title</Loc>
          </p>
          <p>{LocalizeI('Notices.Confirm.Remove.Text', notice.name)}</p>
        </RemoveConfirm>
      )}
    </React.Fragment>
  );
};

export default NoticeDetail;
