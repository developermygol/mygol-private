import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';
import { observer, inject } from 'mobx-react';
import Seasons from './Seasons';
import TournamentModes from './TournamentModes';
import UserConfig from './UserConfig';
import { Route, NavLink, Switch } from 'react-router-dom';
import Import from './Import';
import OrgData from './OrgData';
import Users from './Users';
import NotificationTemplates from './NotificationTemplates';
import AccessLimit from '../../common/AccessLimit';
import OrgSponsors from './OrgSponsors';
import OrgReports from './OrgReports';
import PaymentsIndex from '../PaymentConfig/PaymentsIndex';

@inject('ui')
@observer
class Config extends Component {
  handleLangChange = lang => {
    this.props.ui.setLang(lang);
  };

  render() {
    const baseUrl = this.props.match.url;
    const basePath = '/config';

    return (
      <React.Fragment>
        <ul className="TabBar">
          <AccessLimit allowOrgAdmin>
            {/* <li className='TabItem'><NavLink to={baseUrl} exact><Loc>Home</Loc></NavLink></li> */}
            <li className="TabItem">
              <NavLink to={baseUrl + '/org'}>
                <Loc>Orgdata</Loc>
              </NavLink>
            </li>
            <li className="TabItem">
              <NavLink to={baseUrl + '/seasons'}>
                <Loc>Seasons</Loc>
              </NavLink>
            </li>
            <li className="TabItem">
              <NavLink to={baseUrl + '/tournamentmodes'}>
                <Loc>Tournament modes</Loc>
              </NavLink>
            </li>
            {/* <li className='TabItem'><NavLink to={baseUrl + '/cards'}><Loc>Config.Cards</Loc></NavLink></li> */}
            <li className="TabItem">
              <NavLink to={baseUrl + '/sponsors'}>
                <Loc>Config.Sponsors</Loc>
              </NavLink>
            </li>
            {/* <li className='TabItem'><NavLink to={baseUrl + '/import'}><Loc>Config.Import</Loc></NavLink></li> */}
            <li className="TabItem">
              <NavLink to={baseUrl + '/notiftemplates'}>
                <Loc>Config.NotificationTemplates</Loc>
              </NavLink>
            </li>
            <li className="TabItem">
              <NavLink to={baseUrl + '/users'}>
                <Loc>Config.Users</Loc>
              </NavLink>
            </li>
            <li className="TabItem">
              <NavLink to={baseUrl + '/payments'}>
                <Loc>Payments</Loc>
              </NavLink>
            </li>
            <li className="TabItem">
              <NavLink to={baseUrl + '/reports'}>
                <Loc>OrgReports</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          {/* <li className='TabItem'><NavLink to={baseUrl + '/user'}><Loc>Config.User</Loc></NavLink></li> */}
        </ul>

        <div className="TabContent">
          <Switch>
            <AccessLimit allowOrgAdmin>
              <Route path={basePath + '/org'} component={OrgData} />
              <Route path={basePath + '/seasons'} component={Seasons} />
              <Route path={basePath + '/tournamentmodes'} component={TournamentModes} />
              <Route path={basePath + '/sponsors'} component={OrgSponsors} />
              <Route path={basePath + '/import'} component={Import} />
              <Route path={basePath + '/users'} component={Users} />
              <Route path={basePath + '/user'} component={UserConfig} />
              <Route path={basePath + '/notiftemplates'} component={NotificationTemplates} />
              <Route path={basePath + '/payments'} component={PaymentsIndex} />
              <Route path={basePath + '/reports'} component={OrgReports} />
              {/* <Route path={basePath} exact component={ConfigIndex} /> */}
            </AccessLimit>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

// class ConfigIndex extends Component {
//     render() {
//         return (
//             <div className='CardContainer'>
//             </div>
//         )
//     }
// }

export default Config;
