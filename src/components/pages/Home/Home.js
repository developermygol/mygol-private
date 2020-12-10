import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Levels } from '../../common/AccessLimit';
import OrgAdminHome from '../../common/HomeComponents/OrgAdminHome';
import RefereeHome from '../../common/HomeComponents/RefereeHome';
import PlayerHome from '../../common/HomeComponents/PlayerHome';

@inject('ui')
@observer
class Home extends Component {
  getHomeComponent = () => {
    const { auth } = this.props.ui;
    if (!auth) return null;

    switch (parseInt(auth.level, 10)) {
      case Levels.MasterAdmin:
      case Levels.OrgAdmin:
        return <OrgAdminHome />;
      case Levels.Referee:
        return <RefereeHome />;
      case Levels.Player:
        return <PlayerHome />;
      default:
        return null;
    }
  };

  render() {
    return <div className="Home">{this.getHomeComponent()}</div>;
  }
}

export default Home;
