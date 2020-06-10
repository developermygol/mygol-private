import React, { Component } from 'react';
import DraggableTeam from './DraggableTeam';

class StagesTeams extends Component {
    render() {
        const p = this.props;
        const teams = p.data;

        return (
            <ul className=''>
                {teams.map(team => (
                    <li key={team.id} className='DraggableTeam'><DraggableTeam team={team} dragSource={null} readOnly={p.readOnly} /></li>  // dragSource: { source: 'teamList', position: n }
                ))}
            </ul>
        )
    }
}

export default StagesTeams;