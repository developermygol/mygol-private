import React, { Component } from 'react';
import SoccerField from './SoccerField';

export default class TacticViewer extends Component {
    render() {
        return (
            <div className='TacticField'>
                <SoccerField onClick={this.props.onClick} positions={this.props.positions} />
            </div>
        );
    }
}