import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';

export default class TournamentModes extends Component {
    render() {
        return (
            <React.Fragment>
                <h2><Loc>Tournament modes</Loc></h2>
                <button className='Button' onClick={() => this.props.history.goBack()}><Loc>Back</Loc></button>
            </React.Fragment>
       )
    }
}