import React from 'react';
import Appearance from '../../shared/Appearance/Appearance';

const AppearanceScreen = ({ match }) => {
  const tournamentId = match.params.idTournament;
  const isTournament = tournamentId ? true : false;
  const isOrg = tournamentId ? false : true;

  return <Appearance isTournament={isTournament} isOrg={isOrg} />;
};

export default AppearanceScreen;
