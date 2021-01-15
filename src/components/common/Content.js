import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayerDetails from '../pages/Players/PlayerDetails';
import ErrorBoundary from './ErrorBoundary';

import Home from '../pages/Home/Home';
import Tournaments from '../pages/Tournaments/Tournaments';
import NotFound from './NotFound';
import Facilities from '../pages/Facilities/Facilities';
import Referees from '../pages/Referees/Referees';
import Config from '../pages/Config/Config';
import ContentManager from '../pages/Content/ContentManager';
import Notifications from '../pages/Notifications/Notifications';
import GlobalSearchResult from '../pages/Search/GlobalSearchResult';
import Calendar from '../pages/Calendar/Calendar';

class Content extends Component {
  render = () => {
    return (
      <div className="ContentFrame">
        <div className="Content">
          <ErrorBoundary>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/players/:idPlayer" component={PlayerDetails} />
              <Route path="/tournaments" component={props => <Tournaments {...props} />} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/facilities" component={Facilities} />
              <Route path="/referees" component={Referees} />
              <Route path="/content" component={ContentManager} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/config" component={Config} />
              <Route path="/search/:query" component={GlobalSearchResult} />
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </div>
      </div>
    );
  };
}

export default Content;
