import React, { Component } from "react";
import { observer } from "../../../../../../node_modules/mobx-react";
import { observable } from "../../../../../../node_modules/mobx";
import SoccerField from "./SoccerField";
import { relativeTimeRounding } from "../../../../../../node_modules/moment";

@observer
class TacticEditor extends Component {
  @observable tactic = {
    id: 501,
    numPlayers: 5,
    fieldType: 2,
    name: "",
    positions: [
      { x: 5, y: 9 },
      { x: 4, y: 6 },
      { x: 5, y: 1 },
      { x: 1, y: 5 },
      { x: 4, y: 4 },
    ],
  };

  round = (pt) => {
    return {
      x: Math.round(pt.x),
      y: Math.round(pt.y),
    };
  };

  fieldClickHandler = (pt) => {
    const idx = this.getIndexForPoint(pt);
    if (idx > -1) {
      // Existing point, delete it
      this.tactic.positions.splice(idx, 1);
      return;
    }

    // New point, add it
    pt = this.round(pt);
    this.tactic.positions.push(pt);
  };

  getIndexForPoint = (pt) => {
    pt = this.round(pt);

    const pss = this.tactic.positions;
    for (let i = 0; i < pss.length; ++i) {
      const ps = pss[i];
      if (ps.x === pt.x && ps.y === pt.y) return i;
    }

    return -1;
  };

  clearPositions = () => {
    this.tactic.positions = [];
  };

  getCurrentJson = () => {
    return JSON.stringify(this.tactic, null, 0) + ",";
  };

  render() {
    const p = this.props;

    return (
      <div className="">
        <div className="">
          <button className="Button" onClick={this.clearPositions}>
            Clear positions
          </button>
        </div>
        <div className="TacticField">
          <SoccerField
            onClick={this.fieldClickHandler}
            positions={this.tactic.positions}
          />
        </div>
        <div className="">
          <textarea
            style={{ width: "100%", height: "400px" }}
            value={this.getCurrentJson()}
          />
        </div>
      </div>
    );
  }
}

export default TacticEditor;
