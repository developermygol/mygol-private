import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import InfoBox from '../../common/InfoBox';
import Loc, { Localize, LocalizeI } from '../../common/Locale/Loc';
import { getUploadsImg } from '../../helpers/Utils';

const CalendarMatches = ({ matches, startDate, endDate, season, tournament }) => {
  const matchHasResult = match => {
    const s = match.status;
    return s === 3 || s === 4 || s === 5;
  };

  const handleMatchTimeFormat = dateString => {
    // TODO: 🔎 English format uses am/pm others do NOT
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

                  return (
                    <tr key={uuidv4()}>
                      <td className="First">
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
