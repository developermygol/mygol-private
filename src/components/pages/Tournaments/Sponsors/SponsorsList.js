import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import InfoBox from '../../../common/InfoBox';
import Loc from '../../../common/Locale/Loc';
import SponsorItem from './SponsorItem';

const SponsorsList = ({ sponsors, onEdit, onDelete }) => {
  if (!sponsors || sponsors.length === 0)
    return (
      <div className="Content">
        <InfoBox>
          <Loc>Sponsors.EmptySection</Loc>
        </InfoBox>
      </div>
    );

  const orderedSponsors = sponsors.sort((a, b) => {
    if (a.position > b.sequenceOrder) return 1;
    if (a.position < b.sequenceOrder) return -1;
    return 0;
  });

  return (
    <div className="Content">
      <table className="DataTable">
        <thead>
          <tr className="DataTableHeaderRow">
            <th className="DataTableHeaderCell DataTableCell">
              <Loc>Name</Loc>
            </th>
            <th className="DataTableHeaderCell DataTableCell">
              <Loc>Description</Loc>
            </th>
            <th className="DataTableHeaderCell DataTableCell"></th>
          </tr>
        </thead>
        <tbody>
          {orderedSponsors.map(sponsor => (
            <SponsorItem key={uuidv4()} sponsor={sponsor} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SponsorsList;
