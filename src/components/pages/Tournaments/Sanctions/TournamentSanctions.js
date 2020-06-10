import React, { Component, Fragment } from 'react';
import { withRouter, Route, Switch, NavLink } from 'react-router-dom';
import Loc from '../../../common/Locale/Loc';
import TournamentSanctionsList from './TournamentSanctionsList';
import AutoSanctionsConfig from '../../Sanctions/Automatic/AutoSanctionsConfig';

class TournamentSanctions extends Component {

    render() {
        const baseUrl = this.props.match.url;
        const basePath = this.props.match.path;

        return (
            <Fragment>
                <h2><Loc>Sanctions</Loc></h2>
                <ul className='TabBar'>
                    <li className='TabItem'><NavLink to={baseUrl} exact><Loc>Sanctions</Loc></NavLink></li>
                    <li className='TabItem'><NavLink to={baseUrl + '/autoconfig'}><Loc>Sanctions.AutoConfig</Loc></NavLink></li>
                </ul>
                <div className='TabContent'>
                    <Switch>
                        <Route path={basePath + '/autoconfig'} component={AutoSanctionsConfig}  />} />
                        <Route path={basePath} component={TournamentSanctionsList} />
                    </Switch>
                </div>

            </Fragment>
        )
    }
}




export default withRouter(TournamentSanctions);