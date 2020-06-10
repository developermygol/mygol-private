import React, { Component } from 'react';
import MatchView from '../Calendar/MatchView';


// class RefereeMatch extends Component {
//     render() {
//         const p = this.props;
//         const { match }  = p;

//         const h = match.homeTeam;
//         const v = match.visitorTeam;

//         return (
//             <tr>
//                 <td>{match.startTime}</td>
//                 <td>{h && h.name}</td>
//                 {matchHasResult(match) ?
//                     <td className='ScoreCell'><span className='Score'>{match.homeScore}</span>  <span className='Score'>{match.visitorScore}</span></td>
//                     :
//                     <td className='ScoreCell'>-</td>
//                 }
//                 <td>{v && v.name}</td>
//                 <td>{match.field && match.field.name}</td>
//                 <td>{match.tournament && match.tournament.name}</td>
//                 <td>{Localize('MatchStatus' + match.status)}</td>
//             </tr>
//         );
//     }
// }



class RefereeMatches extends Component {
    render() {
        const p = this.props;
        const { matches } = p;

        if (!matches || matches.length === 0) return null;

        return (
            <table>
                <tbody>
                    {matches.map(m => <MatchView match={m} showTournament noTeamLink />)}
                </tbody>
            </table>
        )
    }
}

export default RefereeMatches;