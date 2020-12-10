import React from 'react';
import XCircle from 'react-feather/dist/icons/x-circle';
import Edit3 from 'react-feather/dist/icons/edit-3';

import IconButton from '../../../formFields/IconButton';

const SponsorItem = ({ sponsor, onEdit, onDelete }) => {
  const { name, altText } = sponsor;

  return (
    <tr className="DataTableRow">
      <td className="DataTableCell">{name}</td>
      <td className="DataTableCell">{altText}</td>
      <td className="DataTableCell">
        <div className="ListActionButtons">
          <IconButton className="Button Third" onClick={() => onEdit(sponsor)}>
            <Edit3 size={20} />
          </IconButton>
          <IconButton className="Button Third" onClick={() => onDelete(sponsor)}>
            <XCircle size={20} />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default SponsorItem;
