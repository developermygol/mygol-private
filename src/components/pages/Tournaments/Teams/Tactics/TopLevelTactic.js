import React, { Component, Fragment } from 'react';
import TeamTactics from './TeamTactics';
import Loc from '../../../../common/Locale/Loc';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';
import TacticPlayerDragAndDrop from './TacticPlayerDragAndDrop';

class TopLevelTactic extends Component {
  render() {
    const p = this.props;
    const basePath = p.match.path;
    const baseUrl = p.match.url;

    return (
      <Fragment>
        <h2>
          <Loc>Tactics</Loc>
        </h2>
        <div className="">
          <ul className="TabBar">
            <li className="TabItem">
              <NavLink to={baseUrl + '/select'}>
                <Loc>Tactic.Selection</Loc>
              </NavLink>
            </li>
            <li className="TabItem">
              <NavLink to={baseUrl + '/players'}>
                <Loc>Tactic.Players</Loc>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="">
          <Switch>
            <Route path={basePath + '/players'} component={TacticPlayerDragAndDrop} />
            <Route path={basePath} component={TeamTactics} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(TopLevelTactic);
