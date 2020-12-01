import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MatchView from './MatchView';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import InfoBox from '../../../common/InfoBox';
import Loc from '../../../common/Locale/Loc';

const defaultProps = {
  idTournament: -1,
  value: null,
  canEdit: true,
  canDelete: true,
  collapsed: false,
};

@inject('store')
@observer
class DayView extends Component {
  @observable collapsed = this.props.collapsed;

  toggleCollapse = () => {
    this.collapsed = !this.collapsed;
  };

  render() {
    const p = this.props;

    const playDay = p.value;
    if (!playDay) return null;

    const { idTournament } = p.match.params;
    const matches = playDay.matches;
    let matchesReorderedByRestTeam = matches;
    if (matches) {
      matchesReorderedByRestTeam = matches.sort((a, b) => {
        const matchAHasTeamResintg = a.status === 10;
        const matchBHasTeamResintg = b.status === 10;
        if (matchAHasTeamResintg) return -1;
        if (matchBHasTeamResintg) return 1;
        return 0;
      });
    }

    // Check if collapsed, if so, do not render the matches. Do so to improve performance.

    return (
      <div className="Card Hero">
        <h3 onClick={this.toggleCollapse}>
          {playDay.name} - <span className="Stage">{p.stage && p.stage.name}</span> -{' '}
          <span className="Position">
            <Loc>SequenceOrder</Loc> {playDay.sequenceOrder}
          </span>
          <button className="Button Second Right" onClick={e => p.onDayDelete(playDay, e)}>
            <Loc>PlayDay.Delete</Loc>
          </button>
        </h3>
        {this.collapsed ? null : (
          <div className="PlayDay Content">
            {matches && matches.length > 0 ? (
              <table>
                <tbody>
                  {matchesReorderedByRestTeam.map((match, i) => (
                    <MatchView
                      key={`${match.id}-${match.idHomeTeam}-${match.idVisitorTeam}-${i}`}
                      normalizedTeams={p.normalTeams}
                      normalizedGroups={p.normalGroups}
                      normalizedFacilities={p.normalFacilities}
                      match={match}
                      idTournament={idTournament}
                      readOnly={p.readOnly}
                      canEdit={p.canEdit}
                      canDelete={p.canDelete}
                      actionButtonsHandler={p.actionButtonsHandler}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <InfoBox>
                <Loc>No matches</Loc>
              </InfoBox>
            )}
          </div>
        )}
      </div>
    );
  }
}

DayView.defaultProps = defaultProps;

export default withRouter(DayView);
