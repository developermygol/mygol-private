import React, { Component } from 'react';
import SoccerFieldMarker from './SoccerFieldMarker';
import MarkerDropTarget from './MarkerDropTarget';

export default class SoccerField extends Component {
  unscaleCoords = evt => {
    const pt = this.svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    var cursorpt = pt.matrixTransform(this.svg.getScreenCTM().inverse());
    return cursorpt;
  };

  getPoints() {
    const { positions, players, callbacks } = this.props;
    if (!positions && !players) return null;

    // Select Tactics
    if (!players)
      return (
        <g>
          {positions.map((p, i) => (
            <MarkerDropTarget key={i} marker={{ idx: i, ...p }} />
          ))}
        </g>
      );

    // Assign Players
    const getPlayerFromPosition = positionIndex =>
      players.find(p => p.teamData.idTacticPosition === positionIndex);

    return (
      <g>
        {/* {positions.map((p, i) => <MarkerDropTarget key={i} marker={{idx: i, ...p}} /> )} */}
        {positions.map((p, i) => (
          <SoccerFieldMarker
            key={i}
            playerInfo={getPlayerFromPosition(i)}
            marker={{ idx: i, ...p }}
            update={(idPlayer, idTeam, idTacticPosition) =>
              callbacks.playerDropped(idPlayer, idTeam, idTacticPosition)
            }
          />
        ))}
      </g>
    );
  }

  clickFilter = e => {
    const tt = this.unscaleCoords(e);
    console.log(tt.x + ', ' + tt.y);

    if (this.props.onClick) this.props.onClick(tt);
  };

  render() {
    const st = '#AAA';
    const sw = 0.1;

    return (
      <svg
        version="1.1"
        viewBox="0 0 16 10"
        {...this.props.passProps}
        onClick={this.clickFilter}
        ref={c => (this.svg = c)}
      >
        <rect style={{ fill: '#ffffff' }} x="0" y="0" width="16" height="10" />
        <rect style={{ fill: 'none', stroke: st, strokeWidth: sw * 2 }} x="0" y="0" width="16" height="10" />
        <line style={{ fill: 'none', stroke: st, strokeWidth: sw }} x1="8" y1="0" x2="8" y2="10" />
        <circle style={{ fill: 'none', stroke: st, strokeWidth: sw }} cx="8" cy="5" r="1.5" />

        <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x="0" y="2.5" width="2.5" height="5" />
        <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x="0" y="4" width="1" height="2" />

        <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x="13.5" y="2.5" width="2.5" height="5" />
        <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x="15" y="4" width="1" height="2" />

        {this.getPoints()}
      </svg>
    );
  }
}
