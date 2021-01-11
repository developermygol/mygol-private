import React, { Component, Fragment } from 'react';
import { withRouter, NavLink, Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Loc from '../../common/Locale/Loc';
import { requestAsync } from '../../helpers/Utils';
import { observable } from 'mobx';
import axios from '../../../axios';
import PlayerEvents from './PlayerEvents';
import Spinner from '../../common/Spinner/Spinner';
import AccessLimit from '../../common/AccessLimit';
import PlayerData from './PlayerData';
import PlayerTeams from './PlayerTeams';
import PlayerPayment from './PlayerPayment';
import PlayerSanctions from '../Tournaments/Teams/Players/PlayerSanctions';

@inject('store')
@observer
class PlayerDetails extends Component {
  @observable loading = false;
  @observable player = null;

  componentDidMount = () => {
    const { idPlayer, idTeam, idTournament } = this.props.match.params;

    let uri = idTeam ? '/players/' + idPlayer + '/' + idTeam : '/players/' + idPlayer;
    uri += '?idTournament=' + idTournament;

    requestAsync(this, axios.get, null, uri).then(res => (this.player = res));
  };

  render() {
    const { idTeam } = this.props.match.params;

    const player = this.player;
    if (!player) return null;

    const baseUrl = this.props.match.url;
    const basePath = this.props.match.path;

    return (
      <Spinner loading={this.loading}>
        {player ? (
          <Fragment>
            <h2>{player.name + ' ' + player.surname}</h2>
            <ul className="TabBar">
              <li className="TabItem">
                <NavLink to={baseUrl} exact>
                  <Loc>Player.Data</Loc>
                </NavLink>
              </li>
              <AccessLimit allowOrgAdmin>
                <li className="TabItem">
                  <NavLink to={baseUrl + '/events'}>
                    <Loc>Player.Events</Loc>
                  </NavLink>
                </li>
                <li className="TabItem">
                  <NavLink to={baseUrl + '/teams'}>
                    <Loc>Player Teams</Loc>
                  </NavLink>
                </li>
                <li className="TabItem">
                  <NavLink to={baseUrl + '/sanctions'}>
                    <Loc>Player.Sanctions</Loc>
                  </NavLink>
                </li>
                {idTeam ? (
                  <li className="TabItem">
                    <NavLink to={baseUrl + '/payments'}>
                      <Loc>Player.Payments</Loc>
                    </NavLink>
                  </li>
                ) : null}
              </AccessLimit>
            </ul>

            <div className="TabContent">
              <Switch>
                <Route path={basePath + '/teams'} render={() => <PlayerTeams player={player} />} />
                <Route path={basePath + '/events'} render={() => <PlayerEvents player={player} />} />
                <Route path={basePath + '/payments'} render={() => <PlayerPayment player={player} />} />
                <Route
                  path={basePath + '/sanctions'}
                  render={() => <PlayerSanctions sanctions={player.sanctions} />}
                />
                <Route path={basePath} exact render={() => <PlayerData player={player} />} />
              </Switch>
            </div>
          </Fragment>
        ) : null}
      </Spinner>
    );
  }
}

export default withRouter(PlayerDetails);
