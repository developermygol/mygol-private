import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import RefereeMatches from "../../pages/Tournaments/Matches/RefereeMatches";

@inject("store")
@observer
class RefereeHome extends Component {
  componentDidMount = () => {
    this.props.store.matches.getMatchesForReferee();
  };

  render() {
    const p = this.props;
    const store = p.store.matches;

    return (
      <div className="CardContainer">
        <div className="PlayDay">
          <RefereeMatches matches={store.all} />
        </div>
      </div>
    );
  }
}

export default RefereeHome;
