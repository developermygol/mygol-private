import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { staticServer } from '../../../../axios';
import {
  startLoadTournamentDreamTeamRankings,
  startUpdateTournamentDreamTeam,
} from '../../../../store/actions/tournaments';

import SoccerField from '../Teams/Tactics/SoccerField';
// import PlayerGrid from '../../Players/PlayerGrid';
import DreamTeamPlayersGrid from './DreamTeamPlayersGrid';
import InfoBox from '../../../common/InfoBox';
import Loc from '../../../common/Locale/Loc';
import { getPlayersInTournamentWithField } from '../../../../store/actions/players';

// const fakePlayers = [
//   {
//     idUser: 81,
//     name: 'TEST',
//     surname: 'TEST',
//     birthDate: '0001-01-01T00:00:00',
//     height: 0,
//     weight: 0,
//     enrollmentStep: 0,
//     approved: true,
//     userData: { email: 'test123@test.com', level: 0, emailConfirmed: false, mobile: '666555444', id: 0 },
//     teamData: {
//       idTeam: 30,
//       idPlayer: 71,
//       status: 261,
//       apparelNumber: 0,
//       fieldPosition: 0,
//       fieldSide: 0,
//       isTeamAdmin: false,
//       idTacticPosition: -1,
//       enrollmentStep: 0,
//       enrollmentDate: '0001-01-01T00:00:00',
//     },
//     id: 71,
//   },
//   {
//     idUser: 76,
//     name: 'Jhon',
//     surname: 'Show',
//     birthDate: '1989-08-18T04:00:00',
//     height: 189,
//     weight: 89,
//     address1: 'underbridge',
//     address2: '',
//     city: 'Balaguer',
//     state: 'Lleida',
//     cp: '25600',
//     country: 'Espanya',
//     idCardNumber: '78099341N',
//     enrollmentStep: 10,
//     approved: true,
//     idPhotoImgUrl: 'B7/09/ixn53v5h.jpg',
//     idCard1ImgUrl: 'FB/B1/ti1e13rs.jpg',
//     idCard2ImgUrl: 'AD/B2/jj3e2lfb.jpg',
//     userData: {
//       email: 'l4wl3ss1989@gmail.com',
//       level: 0,
//       avatarImgUrl: '9D/91/w43t1j4b.jpg',
//       emailConfirmed: false,
//       mobile: '+34640383632',
//       id: 0,
//     },
//     teamData: {
//       idTeam: 30,
//       idPlayer: 68,
//       status: 261,
//       apparelNumber: 0,
//       fieldPosition: 0,
//       fieldSide: 0,
//       isTeamAdmin: false,
//       idTacticPosition: -1,
//       enrollmentStep: 102,
//       enrollmentDate: '0001-01-01T00:00:00',
//     },
//     id: 68,
//   },
// ];

/*
"FieldPosition0": "Sin posición",
"FieldPosition1": "Portero",
"FieldPosition2": "Defensa",
"FieldPosition3": "Centrocampista",
"FieldPosition4": "Delantero",
"FieldPosition5": "Delegado no jugador",
"FieldPosition6": "Entrenador",
"FieldPosition7": "Fisio",
"FieldPosition10": "Cierre F5",
"FieldPosition11": "Pivot F5",
"FieldPosition12": "Ala F5",
*/
const fieldPositions = [1, 2, 3, 4]; // 🚧 Misisng F5

const initialDreamTeam = {};

const DreamTeam = () => {
  const dispatch = useDispatch();
  const [tactics, setTactics] = useState(null);
  const [selectedField, setSelectedField] = useState(1);
  const [dreamTeam, setDreamTeam] = useState(initialDreamTeam);
  const { activeTournament, activeTournamentDreamTeamRanking } = useSelector(state => state.tournaments);
  const { tournamentModes } = useSelector(state => state.tournamentModes);

  useEffect(() => {
    const loadTactics = async () => {
      const { data } = await staticServer.get(`/tactics/tactics.es.json`);

      setTactics(data.tactics);
    };

    loadTactics();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const tournamentPlayersWithField = await getPlayersInTournamentWithField(activeTournament.id);

      dispatch(startLoadTournamentDreamTeamRankings(activeTournament.id, tournamentPlayersWithField));
      if (activeTournament.dreamTeam) setDreamTeam(JSON.parse(activeTournament.dreamTeam));
    };
    if (activeTournament) {
      loadData();
    }
  }, [activeTournament]);

  const handlePlayerCanDrop = () => true;

  const handlePlayerDroppedHandler = async (idPlayer, idTeam, idTacticPosition, fieldPosition) => {
    // Double click remove dreamteam palyer
    if (!fieldPosition) {
      if (dreamTeam.players)
        setDreamTeam({
          ...dreamTeam,
          players: dreamTeam.players.filter(player => player.idTacticPosition !== idTacticPosition),
        });
      return;
    }

    // Add dreamteam player
    const selectedPlayer = activeTournamentDreamTeamRanking[fieldPosition].find(
      el => el.idPlayer === idPlayer && el.idTeam === idTeam
    );
    if (!dreamTeam.players)
      setDreamTeam({ ...dreamTeam, players: [{ ...selectedPlayer, idTacticPosition }] });
    else {
      if (dreamTeam.players.find(el => el.idTacticPosition === idTacticPosition)) {
        setDreamTeam({
          ...dreamTeam,
          players: dreamTeam.players.map(el => {
            if (el.idTacticPosition === idTacticPosition) return { ...selectedPlayer, idTacticPosition };
            return el;
          }),
        });
      } else
        setDreamTeam({
          ...dreamTeam,
          players: [...dreamTeam.players, { ...selectedPlayer, idTacticPosition }],
        });
    }
  };

  const handleSave = () => dispatch(startUpdateTournamentDreamTeam(JSON.stringify(dreamTeam)));

  if (!activeTournament || !tournamentModes || !tactics || !activeTournamentDreamTeamRanking) return null;

  const { numPlayers } = tournamentModes.find(mode => mode.id === activeTournament.idTournamentMode);
  const defaultTactic = tactics.filter(t => t.numPlayers === numPlayers)[0];

  if (!defaultTactic) return null;

  return (
    <div className="CardContainer">
      <h2>
        <Loc>Dream team</Loc>
      </h2>
      <p className="TacticHint"></p>
      <SoccerField
        isDreamTeam
        players={dreamTeam.players ? dreamTeam.players : []}
        positions={defaultTactic.positions}
        onUpdate={null}
        callbacks={{
          playerCanDrop: handlePlayerCanDrop,
          playerDropped: handlePlayerDroppedHandler,
        }}
      />

      <div className="DreamTeamTabControl" style={{ width: '100%' }}>
        <ul className="TabBar">
          {fieldPositions.map(fieldPosition => (
            <li key={uuidV4()} className="TabItem" onClick={() => setSelectedField(fieldPosition)}>
              <a className={selectedField === fieldPosition ? 'active' : ''}>
                <Loc>{`FieldPosition${fieldPosition}`}</Loc>
              </a>
            </li>
          ))}
        </ul>
        <div className="TabContent">
          {activeTournamentDreamTeamRanking[selectedField] ? (
            <DreamTeamPlayersGrid players={activeTournamentDreamTeamRanking[selectedField]} isDreamTeam />
          ) : (
            <InfoBox>
              <Loc>DreamTeamEmptyCategory</Loc>
            </InfoBox>
          )}
        </div>
      </div>
      <button className="Button Active" onClick={handleSave}>
        Guardar
      </button>
    </div>
  );
};

export default DreamTeam;
