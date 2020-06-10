import React, { Component } from 'react';

class SoccerFieldMarker extends Component {
    scale(x) {
        const scale = 1;
        return x * scale;
    }

    render() {
        const p = this.props;
        const { marker } = p;

        return (
            <circle
                style={{ fill: '#f28e00', stroke: '#ffffff', strokeWidth: '0' }}
                cx={this.scale(marker.x)}
                cy={this.scale(marker.y)}
                r="0.7" />
        )
    }
}

export default SoccerFieldMarker;