import React from 'react';

import Loc from '../../common/Locale/Loc';
import SponsorsList from './SponsorsList';

const TopPosition = 1;
const MidPosotion = 2;
const BottomPosition = 3;

const defaultSectionTournamentSponsorData = {
  type: 0,
  hide: false,
  inherit: true,
};

const SponsorsGroups = ({ configSections, sponsors, onEdit, onDelete, onConfig }) => {
  if (!sponsors) return null;

  const TopSponsors = sponsors.filter(sponsor => sponsor.position === TopPosition);
  const MidSponsors = sponsors.filter(sponsor => sponsor.position === MidPosotion);
  const BottomSponsors = sponsors.filter(sponsor => sponsor.position === BottomPosition);

  if (!configSections)
    configSections = {
      sections: [
        defaultSectionTournamentSponsorData,
        defaultSectionTournamentSponsorData,
        defaultSectionTournamentSponsorData,
        defaultSectionTournamentSponsorData,
      ],
    };

  return (
    <div className="SponsorsGroup">
      <h3>
        <Loc>SponsorPosition1</Loc>
        <button className="Button Second Right" onClick={() => onConfig(1, configSections[1])}>
          <Loc>Sponsors.EditSectionConfig</Loc>
        </button>
      </h3>
      <SponsorsList sponsors={TopSponsors} onEdit={onEdit} onDelete={onDelete} />
      <h3>
        <Loc>SponsorPosition2</Loc>
        <button className="Button Second Right" onClick={() => onConfig(2, configSections[2])}>
          <Loc>Sponsors.EditSectionConfig</Loc>
        </button>
      </h3>
      <SponsorsList sponsors={MidSponsors} onEdit={onEdit} onDelete={onDelete} />
      <h3>
        <Loc>SponsorPosition3</Loc>
        <button className="Button Second Right" onClick={() => onConfig(3, configSections[3])}>
          <Loc>Sponsors.EditSectionConfig</Loc>
        </button>
      </h3>
      <SponsorsList sponsors={BottomSponsors} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default SponsorsGroups;
