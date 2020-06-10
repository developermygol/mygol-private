import React, { Component } from 'react';
import Sanctions from '../../Sanctions/Sanctions';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Loc from '../../../common/Locale/Loc';

@inject('store') @observer
class MatchSanctions extends Component {

    render() {
        const p = this.props;
        const store = p.store.sanctions;
        const match = p.data;

        if (!match) return null;

        return (
            <div className=''>
                <h4><Loc>Sanctions</Loc></h4>
                <Sanctions 
                    getAllAction={() => store.getAllForMatch(match.id)} 
                    canAdd={true} 
                    matchData={match}
                    idDay={match.idDay}
                    idMatch={match.id}
                    idTournament={match.idTournament}
                    startDate={match.startTime}
                />
            </div>
        )
    }
}

export default withRouter(MatchSanctions);