import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inject, observer } from 'mobx-react';
import { ToastContainer } from 'react-toastify';

import NavBar from './NavBar';
import TopBar from './TopBar';
import Content from './Content';
import { startLoadOrganization } from '../../store/actions/organizations';
import { startLoadingFields } from '../../store/actions/fields';
import { startLoadTournamentModes } from '../../store/actions/tournamentModes';
import { startLoadSeasons } from '../../store/actions/seasons';
import { startLoadTournaments } from '../../store/actions/tournaments';

@inject('store')
@observer
class Root extends Component {
  state = {
    loaded: null,
  };

  componentDidMount = async () => {
    this.props.store.organization.fetch();
    await this.props.onLoadOrganizations();
    await this.props.onLoadSeasons();
    await this.props.onLoadTournamentModes();
    await this.props.onLoadTournaments();
    await this.props.onLoadFields();
    this.setState({ loaded: true });
  };

  render() {
    const org = this.props.store.organization.current;
    if (!org || !this.state.loaded) return null;

    return (
      <div className="Root">
        <NavBar />
        <TopBar />
        <Content />
        {/* <p className='DevWarning'>Env: {process.env.NODE_ENV}, {process.env.REACT_APP_BRANCH} -> {process.env.REACT_APP_COMMIT}</p> */}
        <ToastContainer hideProgressBar={true} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.organizations,
});

const mapDispatchToProps = dispatch => ({
  onLoadOrganizations: () => dispatch(startLoadOrganization()),
  onLoadSeasons: () => dispatch(startLoadSeasons()),
  onLoadTournamentModes: () => dispatch(startLoadTournamentModes()),
  onLoadTournaments: () => dispatch(startLoadTournaments()),
  onLoadFields: () => dispatch(startLoadingFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
