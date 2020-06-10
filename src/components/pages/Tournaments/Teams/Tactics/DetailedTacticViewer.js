import React, { Component, Fragment } from "react";
import TacticViewer from "./TacticViewer";
import Loc from "../../../../common/Locale/Loc";

export default class DetailedTacticViewer extends Component {
  render() {
    const tactic = this.props.value;

    return (
      <div className="TacticDetails">
        <div className="Field">
          <TacticViewer positions={tactic ? tactic.positions : null} />
        </div>
        <div className="Details">
          {tactic ? (
            <Fragment>
              <h3>{tactic.name}</h3>
              <h4>{tactic.title}</h4>
              <p>{tactic.description}</p>
            </Fragment>
          ) : (
            <Fragment>
              <h3>
                <Loc>Tactic.NoTactic</Loc>
              </h3>
              <p>
                <Loc>Tactic.Choose</Loc>
              </p>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
