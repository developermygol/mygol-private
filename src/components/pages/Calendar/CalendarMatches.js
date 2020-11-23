import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import InfoBox from '../../common/InfoBox';
import Loc from '../../common/Locale/Loc';
import { getUploadsImg } from '../../helpers/Utils';

const CalendarMatches = ({ matches, startDate, endDate }) => {
  const matchHasResult = match => {
    const s = match.status;
    return s === 3 || s === 4 || s === 5;
  };

  return (
    <div className="Card Hero CalendarView">
      <div className="PlayDay Content">
        {matches && matches.length > 0 ? (
          <React.Fragment>
            <h3>
              <Loc>Matches.On</Loc>
              {` ${startDate ? startDate.toLocaleDateString() : ''} ${
                endDate ? ' - ' + endDate.toLocaleDateString() : ''
              }`}
            </h3>
            <table>
              <tbody>
                {matches.map((match, i) => {
                  const home = match.homeTeam;
                  const visitor = match.visitorTeam;
                  const isClosedAct = match.status === 5;

                  return (
                    <tr key={uuidv4()}>
                      {isClosedAct && (
                        <td class="First">
                          <span class="MatchStatusRecordClosed" title="Acta cerrada"></span>
                        </td>
                      )}
                      <td>
                        <Link to={'/tournaments/' + match.idTournament + '/matches/' + match.id}>
                          {match.startTime}
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
