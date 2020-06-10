import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';

class RefereeDetails extends Component {
    render() {
        const p = this.props;

        return (
            <div>
                <h2><Loc>Referees</Loc></h2>
                {p.data.name}
            </div>
        )
    }
}

export default RefereeDetails;