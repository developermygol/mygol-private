import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import Loc, { Localize } from '../../../common/Locale/Loc';
import DraggableTeam from './DraggableTeam';
import TeamDropContainer from './TeamDropContainer';

import IconButton from '../../../../formFields/IconButton';
import XCircle from 'react-feather/dist/icons/x-circle';
import Edit3 from 'react-feather/dist/icons/edit-3';

@observer
class StagesTable extends Component {
  render() {
    const p = this.props;
    const { stages } = p;

    return (
      <table className="TreeTable">
        <tbody>{stages ? stages.map(stage => <Stage key={stage.id} stage={stage} {...p} />) : null}</tbody>
      </table>
    );
  }
}

@observer
class Stage extends Component {
  getStageGroups = () => {
    const p = this.props;
    const stageId = p.stage.id;
    return p.groups.filter(g => g.idStage === stageId);
  };

  render() {
    const p = this.props;
    const { stage } = p;
    const allowChanges = stage.status === 1;
    //const showResults = stage.status > 1 && stage.type === 1;
    const showResults = false;

    return (
      <Fragment>
        <StageRow stage={stage} edit={p.edit} allowChanges={allowChanges} {...p} />
        {this.getStageGroups().map(group => (
          <Group key={group.id} allowChanges={allowChanges} showResults={showResults} group={group} {...p} />
        ))}
      </Fragment>
    );
  }
}

@observer
class StageRow extends Component {
  render() {
    const p = this.props;
    const { stage } = p;
    //const active = stage.status === 2;
    const editable = stage.status === 1;
    const cbs = p.callbacks;

    return (
      <tr>
        <td colSpan={8} className="Level1">
          <span className="StageName">{stage.name}</span>{' '}
          <span className="">
            <Loc>{'StageType' + stage.type}</Loc>{' '}
          </span>
          <span className={'StageStatus StageStatus' + stage.status}>
            {' '}
            <Loc>{'StageStatus' + stage.status}</Loc>
          </span>
          {p.edit ? (
            <span className="Actions">
              {editable && !p.readOnly ? (
                <button className="Button Third" onClick={() => cbs.addGroup(stage)}>
                  <Loc>Add group</Loc>
                </button>
              ) : null}
              {/* {!active ? <button className='Button Third' onClick={() => cbs.setActiveStage(stage)}><Loc>Set as active</Loc></button> : null } */}
              <IconButton className="Button Third" onClick={() => cbs.editStage(stage)}>
                <Edit3 size={20} />
              </IconButton>
              {!p.readOnly ? (
                <IconButton className="Button Third" onClick={() => cbs.deleteStage(stage)}>
                  <XCircle size={20} />
                </IconButton>
              ) : null}
            </span>
          ) : null}
        </td>
      </tr>
    );
  }
}

@observer
class Group extends Component {
  getTeamGroups = () => {
    const p = this.props;
    const groupId = p.group.id;
    return p.teamGroups.filter(tt => tt.idGroup === groupId);
  };

  getTeamRows(props) {
    const { group } = props;
    const teamGroups = this.getTeamGroups();
    let result = new Array(parseInt(group.numTeams, 10));

    teamGroups.forEach(team => {
      const i = team.sequenceOrder;
      if (i >= group.numTeams) return;

      result[i] = <TeamRow key={team.id} teamGroup={team} sequenceOrder={i} {...props} />;
    });

    // Now add empty TeamRow slots for those without team.
    for (let i = 0; i < result.length; ++i) {
      if (!result[i]) {
        result[i] = <TeamRow key={i} sequenceOrder={i} {...props} />;
      }
    }

    return result;
  }

  render() {
    const p = this.props;

    return (
      <Fragment>
        <GroupRow {...p} />
        {this.getTeamRows(p)}
      </Fragment>
    );
  }
}

@observer
class GroupRow extends Component {
  render() {
    const p = this.props;
    const { group } = p;
    if (!group) return null;
    const cbs = p.callbacks;

    return (
      <tr>
        <td className="Level2">
          <span className="GroupName">{group.name}</span>{' '}
          <span className="">({group.numTeams + ' ' + Localize('teams')})</span>
        </td>
        {p.showResults ? (
          <Fragment>
            <td className="Number">
              <Loc>TournamentPointsShort</Loc>
            </td>
            <td className="Number GamesWon ">
              <Loc>GamesWonShort</Loc>
            </td>
            <td className="Number GamesDraw">
              <Loc>GamesDrawShort</Loc>
            </td>
            <td className="Number GamesLost">
              <Loc>GamesLostShort</Loc>
            </td>
            <td className="Number Points   ">
              <Loc>PointsShort</Loc>
            </td>
            <td className="Number PointsAgainst">
              <Loc>PointsAgainstShort</Loc>
            </td>
          </Fragment>
        ) : null}
        {p.edit ? (
          <td colSpan={p.showResults ? 1 : 7}>
            <span className="Actions">
              <button className="Button Third" onClick={() => cbs.editGroupCalendar(group)}>
                <Loc>Calendar</Loc>
              </button>
              <IconButton className="Button Third" onClick={() => cbs.editGroup(group)}>
                <Edit3 size={20} />
              </IconButton>
              {!p.readOnly ? (
                <IconButton className="Button Third" onClick={() => cbs.deleteGroup(group)}>
                  <XCircle size={20} />
                </IconButton>
              ) : null}
            </span>
          </td>
        ) : null}
      </tr>
    );
  }
}

@observer
class TeamRow extends Component {
  render() {
    const p = this.props;
    const { teamGroup } = p;
    const sd = teamGroup ? teamGroup.summaryData : null;
    const teamData = teamGroup && p.normalTeams ? p.normalTeams[teamGroup.idTeam] : null;

    return (
      <Fragment>
        <tr>
          {teamGroup ? (
            <Fragment>
              <td className="Level3" colSpan={p.showResults ? 1 : 7}>
                <DraggableTeam team={teamData} dragSource={p.group} readOnly={p.readOnly} />
                <IconButton className="Button Third" onClick={() => p.callbacks.deleteTeamGroup(teamGroup)}>
                  <XCircle size={20} />
                </IconButton>
              </td>
              {p.showResults && sd ? (
                <Fragment>
                  <td className="Number">{sd ? sd.tournamentPoints : ''}</td>
                  <td className="Number GamesWon ">{sd ? sd.gamesWon : ''}</td>
                  <td className="Number GamesDraw">{sd ? sd.gamesDraw : ''}</td>
                  <td className="Number GamesLost">{sd ? sd.gamesLost : ''}</td>
                  <td className="Number Points   ">{sd ? sd.points : ''}</td>
                  <td className="Number PointsAgainst">{sd ? sd.pointsAgainst : ''}</td>
                </Fragment>
              ) : null}
              <td colSpan={p.showResults ? 1 : 7}>
                <span className="Actions"></span>
              </td>
            </Fragment>
          ) : (
            <Fragment>
              <td className="Level3" colSpan={7}>
                <TeamDropContainer sequenceOrder={p.sequenceOrder} {...p} />
              </td>
            </Fragment>
          )}
        </tr>
      </Fragment>
    );
  }
}

export default StagesTable;
