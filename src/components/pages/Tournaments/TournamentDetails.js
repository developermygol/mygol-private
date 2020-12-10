import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import asyncComponent from '../../common/AsyncComponent';
import { getUploadsIcon } from '../../helpers/Utils';
import Loc from '../../common/Locale/Loc';
import Players from './Players/TournamentPlayers';
import BreadCrumb from '../../common/Breadcrumb';
import Matches from './Matches/Matches';
import StagesIndex from './Stages/StagesIndex';
import TournamentIndex from './TournamentIndex';
import AccessLimit from '../../common/AccessLimit';
import PaymentsIndex from '../PaymentConfig/PaymentsIndex';
import TournamentSanctions from './Sanctions/TournamentSanctions';
import Sponsors from '../../shared/Sponsors/Sponsors';
import AppearanceScreen from '../Config/Appearance';
import { connect } from 'react-redux';
import { startLoadTournaments, setActiveTournament } from '../../../store/actions/tournaments';

const asyncTeams = asyncComponent(() => import('./Teams/Teams'));

@inject('store')
@observer
class TournamentDetails extends Component {
  componentDidMount = async () => {
    // Set the current tournament
    const id = this.props.match.params.idTournament;
    this.props.store.tournaments.setCurrent(id);

    await this.props.onLoadTournaments();
    this.props.onSetActiveTournament(this.props.tournaments.tournaments.find(t => t.id === parseInt(id, 10)));
  };

  linkClick = () => {
    this.props.store.teams.setCurrent(null);
  };

  render() {
    const baseUrl = this.props.match.url;
    const tournament = this.props.store.tournaments.current;
    const basePath = '/tournaments/:idTournament';

    return (
      <React.Fragment>
        <ul className="SecNavBar">
          <li className="TournamentLogo">
            <img
              alt=""
              src={tournament ? getUploadsIcon(tournament.logoImgUrl, tournament.id, 'tournament') : null}
              className="Logo"
            />
          </li>

          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl} exact>
                <Loc>Home</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl + '/teams'}>
                <Loc>Teams</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl + '/stages'}>
                <Loc>Stages and groups</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl + '/matches'}>
                <Loc>Calendar</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          {/* <AccessLimit allowOrgAdmin><li><NavLink className='SecNavItem' onClick={this.linkClick} to={baseUrl + '/players'}><Loc>Players</Loc></NavLink></li></AccessLimit> */}
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl + '/sanctions'}>
                <Loc>Sanctions</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl + '/payments'}>
                <Loc>Payments</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl + '/sponsors'}>
                <Loc>Sponsors</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="SecNavItem" onClick={this.linkClick} to={baseUrl + '/appearance'}>
                <Loc>Appearance</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          {/* <li><NavLink className='SecNavItem' onClick={this.linkClick} to={baseUrl + '/content'}><Loc>Content management</Loc></NavLink></li> */}
        </ul>

        <div className="SecContent">
          <BreadCrumb />
          <AccessLimit allowOrgAdmin>
            <Route path={basePath + '/stages'} component={StagesIndex} />
          </AccessLimit>
          <AccessLimit allowOrgAdmin allowTeamAdmin allowPlayer>
            <Route path={basePath + '/teams'} component={asyncTeams} />
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <Route path={basePath + '/players'} component={Players} />
          </AccessLimit>
          <Route path={basePath + '/sanctions'} component={TournamentSanctions} />
          <AccessLimit allowOrgAdmin allowReferee>
            <Route path={basePath + '/matches'} component={Matches} />
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <Route path={basePath + '/payments'} component={PaymentsIndex} />
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <Route path={basePath + '/sponsors'} component={Sponsors} />
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <Route path={basePath + '/appearance'} component={AppearanceScreen} />
          </AccessLimit>
          <AccessLimit allowOrgAdmin>
            <Route path={basePath} exact component={TournamentIndex} />
          </AccessLimit>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
});

const mapDispatchToProps = dispatch => ({
  onLoadTournaments: () => dispatch(startLoadTournaments()),
  onSetActiveTournament: torunament => dispatch(setActiveTournament(torunament)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TournamentDetails));
