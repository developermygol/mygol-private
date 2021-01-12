import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';
import { Link } from 'react-router-dom';
import { getUploadsImg } from '../../../helpers/Utils';
import { getFormattedDateTime } from '../../../common/FormsMobx/Utils';
import { observer } from 'mobx-react';

export const isFillerMatch = match => {
  return match.idHomeTeam === -1 || match.idVisitorTeam === -1;
};

export const matchHasResult = match => {
  const s = match.status;
  // eslint-disable-next-line eqeqeq
  return s == 3 || s == 4;
};

@observer
class MatchView extends Component {
  getFieldLink = idField => {
    const p = this.props;
    const field = p.normalizedFacilities[idField];
    if (!field) return null;

    //return <Link to={'/facilities/' + idField}>{field.name}</Link>
    // Return name instead of link. Field details is not implemented as a separate screen.
    return field.name;
  };

  getMatchSanctionStatusBadge = match => {
    return <span className={match.status <= 3 ? 'SanctionMatchPending' : 'SanctionMatchDone'}></span>;
  };

  render() {
    const p = this.props;
    const match = p.match;
    const tId = (match.tournament && match.tournament.id) || p.idTournament;
    const teams = p.normalizedTeams;
    const home = match.homeTeam || teams[match.idHomeTeam];
    const visitor = match.visitorTeam || teams[match.idVisitorTeam];
    const editable = p.canEdit || p.canDelete;
    const readOnly = p.readOnly;

    const group = p.normalizedGroups && p.normalizedGroups[match.idGroup];

    // Need to handle here the team with -1. In this type of match, there will be no startTime
    // and one of the team ids will be -1. Just output "Team xxx rests".
    if (isFillerMatch(match)) {
      return (
        <tr>
          <td colSpan={8}>
            {match.idHomeTeam === -1 ? (
              visitor ? (
                <Link to={'/tournaments/' + tId + '/teams/' + visitor.id}>
                  {getUploadsImg(visitor.logoImgUrl, visitor.id, 'team', 'TeamLogo')} {visitor.name}
                </Link>
              ) : (
                <span className="MatchTeamDesc">{match.visitorTeamDescription}</span>
              )
            ) : home ? (
              <Link to={'/tournaments/' + tId + '/teams/' + home.id}>
                {getUploadsImg(home.logoImgUrl, home.id, 'team', 'TeamLogo')} {home.name}
              </Link>
            ) : (
              <span className="MatchTeamDesc">{match.homeTeamDescription}</span>
            )}
            <Loc>Rests</Loc>
          </td>
          {editable && !readOnly ? (
            p.actionButtonsHandler ? (
              <td>{p.actionButtonsHandler(match)}</td>
            ) : null
          ) : null}
        </tr>
      );
    }

    const dd = new Date(match.startTime);
    const date = dd.getYear() === 1 ? null : getFormattedDateTime(dd);
    const noDateSpecified = date === '01/01/1 00:00';
    const isMatchStatusRecordClosed = match.status === 5;

    return (
      <tr>
        <td className={`First ${isMatchStatusRecordClosed ? 'flex' : ''}`}>
          {isMatchStatusRecordClosed && <span className="MatchStatusRecordClosed" title="Record closed" />}
          {p.displaySanctioned ? this.getMatchSanctionStatusBadge(match) : null}
          {readOnly ? (
            noDateSpecified ? (
              ''
            ) : (
              date
            )
          ) : (
            <Link to={'/tournaments/' + tId + '/matches/' + match.id}>
              {noDateSpecified ? <Loc>Match.NoDate.Editable</Loc> : date}
            </Link>
          )}
        </td>

        {match.tournament && p.showTournament ? <td>{match.tournament.name}</td> : null}

        <td className="Right">
          {home ? (
            p.noTeamLink ? (
              home.name
            ) : (
              <Link to={'/tournaments/' + tId + '/teams/' + home.id}>{home.name}</Link>
            )
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

        <td>{visitor ? getUploadsImg(visitor.logoImgUrl, visitor.id, 'team', 'TeamLogo') : null}</td>
        <td className="Left">
          {visitor ? (
            p.noTeamLink ? (
              visitor.name
            ) : (
              <Link to={'/tournaments/' + tId + '/teams/' + visitor.id}>{visitor.name}</Link>
            )
          ) : (
            <span className="MatchTeamDesc">{match.visitorTeamDescription}</span>
          )}
        </td>

        <td>{group && group.name}</td>
        <td className="Left">
          {`${p.normalizedFacilities ? this.getFieldLink(match.idField) : ''} ${
            match.field ? match.field.name : ''
          }`}
        </td>
        {/* {p.normalizedFacilities ? <td className="Left">{this.getFieldLink(match.idField)}</td> : null}
        {match.field ? <td className="Left">{match.field.name}</td> : null} */}
        {/* <td>{match.videoUrl ? <a className='MatchVideo' href={match.videoUrl} target='_blank'>Vid</a> : null}</td> */}

        {editable && !readOnly ? (
          p.actionButtonsHandler ? (
            <td>{p.actionButtonsHandler(match)}</td>
          ) : null
        ) : null}
      </tr>
    );
  }
}

export default MatchView;
