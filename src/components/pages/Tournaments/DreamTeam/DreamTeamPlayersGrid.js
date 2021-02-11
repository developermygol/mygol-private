import React from 'react';
import { v4 as uuidV4 } from 'uuid';

import DraggablePlayerGridItem from '../Teams/Tactics/DraggablePlayerGridItem';

const DreamTeamPlayersGrid = ({ players, isDreamTeam = false }) => {
  return (
    <ul className="PlayerGrid">
      {players.map(player => (
        <DraggablePlayerGridItem key={uuidV4()} player={player} isDreamTeam={isDreamTeam} />
      ))}
    </ul>
  );
};

export default DreamTeamPlayersGrid;
