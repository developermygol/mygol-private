import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import organizationReducer from './reducers/organizationReducer';
import tournamentsReducer from './reducers/tournamentsReducer';
import sponsorsReducer from './reducers/sponsorsReducer';

const rootReducer = combineReducers({
  organizations: organizationReducer,
  tournaments: tournamentsReducer,
  sponsors: sponsorsReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
