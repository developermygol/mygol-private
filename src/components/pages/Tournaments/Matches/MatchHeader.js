import React, { Component } from 'react';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { getUploadsImg } from '../../../helpers/Utils';
import { getFormattedDateTime } from '../../../common/FormsMobx/Utils';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import AccessLimit from '../../../common/AccessLimit';


@observer
export default class MatchHeader extends Component {
    render() {
        const { match } = this.props;

        return (
            <div className='MatchHeader'>
                {/* Should have the routes for display and edition here. */}
                <div className='MatchTeams'>
                    <TeamInfo team={match.homeTeam} alternate={match.homeTeamDescription} />
                    <MatchStatus match={match} onEdit={this.props.onEdit} />
                    <TeamInfo team={match.visitorTeam} alternate={match.visitorTeamDescription} />
                </div>
            </div>
        )
    }
}


const TeamInfo = withRouter(class extends Component {
    render() {
        const { props } = this;
        const { team, alternate } = props;
        const { idTournament } = this.props.match.params;

        return (
            <div className='Team'>
                { team ? 
                    <div className='LargeTeamInfo '>
                        {getUploadsImg(team.logoImgUrl, team.id, 'team')}
                        <Link to={'/tournaments/' + idTournament + '/teams/' + team.id}><h3>{team.name}</h3></Link>
                    </div>
                    :
                    <div>
                        { alternate ? 
                            <span className='MatchTeamDesc'>{alternate}</span>
                            :
                            <span className='NoTeam'>?</span>
                        }
                    </div>
                }
            </div>
        )
    }
})

@observer
class MatchStatus extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className='MatchStatus'>
                <div className='Details'>
                    <p className='Day'>{match.day ? match.day.name : null}</p>
                    <p><span className='V'>{match.startTime ? getFormattedDateTime(match.startTime) : Localize('Match.NoTime')}</span> </p>
                    <p><span className=''>{match.field ? match.field.name : Localize('Match.NoFacility')}</span></p>
                </div>
                <div className='Score'>
                    {match.homeScore}
                    &nbsp;-&nbsp;
                    {match.visitorScore}
                </div>
                <div className='Details'>
                    <p><span className=''><Loc>{'MatchStatus' + match.status}</Loc></span></p>
                </div>
                <div>
                    <AccessLimit allowOrgAdmin> <button className='Button' onClick={this.props.onEdit}><Loc>Match.Edit</Loc></button> </AccessLimit>
                </div>
            </div>
        )
    }
}