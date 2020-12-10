import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider as ProviderMobx } from 'mobx-react';

import Login from './components/pages/LoginPage/Login';
import Root from './components/common/Root';

import mobxStore from './store-mobx/Store';
import mobxUiStore from './store-mobx/UiStore';

import createHistory from 'history/createBrowserHistory';
import { validateLocation } from './RouteValidation';

//import DevTools from 'mobx-react-devtools';

const history = createHistory({ basename: process.env.PUBLIC_URL });
history.listen((location, action) => {
  validateLocation(history, mobxUiStore.auth);
});

// @DragDropContext(HTML5Backend, { window }) // Old version
class App extends Component {
  state = {
    themeCssFile:
      process.env.PUBLIC_URL +
      (process.env.NODE_ENV === 'production'
        ? '/theme/1.' + process.env.REACT_APP_COMMIT + '.css'
        : '/theme/1.css'),
  };

  componentDidMount() {
    validateLocation(history, mobxUiStore.auth);
  }

  render() {
    return (
      <ProviderMobx store={mobxStore} ui={mobxUiStore}>
        <Fragment>
          <link rel="stylesheet" type="text/css" href={this.state.themeCssFile} />
          <Router history={history}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route component={props => <Root {...props} />} />
            </Switch>
          </Router>
        </Fragment>
      </ProviderMobx>
    );
  }
}

export default App;
