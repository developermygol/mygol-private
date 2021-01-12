import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import InfoBox from '../../common/InfoBox';
import Loc, { Localize, LocalizeI } from '../../common/Locale/Loc';
import { getUploadsImg } from '../../helpers/Utils';

const CalendarMatches = ({ matches, startDate, endDate, season, tournament }) => {
  const { fields } = useSelector(state => state.fields);

  const matchHasResult = match => {
    const s = match.status;
    return s === 3 || s === 4 || s === 5;
  };

  const handleMatchTimeFormat = dateString => {
    // TODO: 🔎 English format uses am/pm others do NOT
    const noSpecifiedDate = dateString === '0001-01-01T00:00:00';
    if (noSpecifiedDate) return Localize('Match.NoDate.Editable');

    if (!dateString || dateString === '') return '';
    const date = new Date(dateString);
    // return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return moment(date).format('DD/MM/YYYY HH:mm');
  };

  const handleInfoText = () => {
    let finaltext = '';
    if (startDate && endDate)
      finaltext += LocalizeI(
        'GlobalCalendar.MatchesOnRange',
        startDate.toLocaleDateString(),
        endDate.toLocaleDateString()
      );
    else if (startDate) finaltext += LocalizeI('GlobalCalendar.MatchesOn', startDate.toLocaleDateString());

    if (tournament) finaltext += LocalizeI('GlobalCalendar.MatchesOfTournament', tournament.name);
    if (season) finaltext += LocalizeI('GlobalCalendar.MatchesOfSeason', season.name);

    return finaltext;
  };

  const handleField = idField => {
    const noField = idField === 0 || idField === null || fields.length === 0;
    if (noField) return null;

    const matchField = fields.find(f => f.id === idField);
    return matchField.name;
  };

  const handleLoadReferees = referees => {
    if (!referees || referees.length === 0) return null;

    return (
      <td className="Referees">
        {referees.map(ref => {
          const { referee, idUser } = ref;
          const { avatarImgUrl, name } = referee;
          return (
            <React.Fragment key={uuidv4()}>
              {getUploadsImg(avatarImgUrl, idUser, 'user', 'RefereeAvatar Mini', name)}
            </React.Fragment>
          );
        })}
      </td>
    );
  };

  return (
    <div className="Card Hero CalendarView">
      <div className="PlayDay Content">
        {matches && matches.length > 0 ? (
          <React.Fragment>
            <h3>{handleInfoText()}</h3>
            <table>
              <tbody>
                {matches.map((match, i) => {
                  const home = match.homeTeam;
                  const visitor = match.visitorTeam;
                  const isClosedAct = match.status === 5;
                  const field = handleField(match.idField);

                  const referees = handleLoadReferees(match.referees);

                  return (
                    <tr key={uuidv4()}>
                      <td className={`First ${isClosedAct ? 'flex' : ''}`}>
                        {isClosedAct && (
                          <span
                            className="MatchStatusRecordClosed"
                            title={Localize('MatchEventType100')}
                          ></span>
                        )}
                        <Link to={'/tournaments/' + match.idTournament + '/matches/' + match.id}>
                          {handleMatchTimeFormat(match.startTime)}
                        </Link>
                      </td>
                      <td className="Right">
                        {home ? (
                          <Link to={'/tournaments/' + match.idTournament + '/teams/' + home.id}>
                            {home.name}
                          </Link>
                        ) : (
                          <span className="MatchTeamDesc">{match.homeTeamDescription}</span>
                        )}
                      </td>

                      <td>{home ? getUploadsImg(home.logoImgUrl, home.id, 'team', 'TeamLogo') : null}</td>

                      {matchHasResult(match) ? (
                        <td className="ScoreCell">
                          <span className="Score">{match.homeScore}</span>{' '}
                          <span className="Score">{match.visitorScore}</span>
                        </td>
                      ) : (
                        <td className="ScoreCell">-</td>
                      )}

                      <td>
                        {visitor ? getUploadsImg(visitor.logoImgUrl, visitor.id, 'team', 'TeamLogo') : null}
                      </td>
                      <td className="Left">
                        {visitor ? (
                          <Link to={'/tournaments/' + match.idTournament + '/teams/' + visitor.id}>
                            {visitor.name}
                          </Link>
                        ) : (
                          <span className="MatchTeamDesc">{match.visitorTeamDescription}</span>
                        )}
                      </td>
                      <td>
                        <Link to={'/tournaments/' + match.idTournament}>{match.tournament.name}</Link>
                      </td>
                      {field && <td className="Left">{field}</td>}
                      {referees}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        ) : (
          <InfoBox>
            <Loc>GlobalCalendar.NoMatches</Loc>
          </InfoBox>
        )}
      </div>
    </div>
  );
};

export default CalendarMatches;
