import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { Provider } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import store from './components/store/store';
import App from './App';
import { unregister } from './registerServiceWorker';

import 'moment/locale/es';
import 'moment/locale/ca';

//import registerServiceWorker from './registerServiceWorker';

// const wait = setInterval(() => {
//     clearInterval(wait);

const root = document.getElementById('root');
const body = document.getElementsByTagName('body')[0];
body.className = 'loaded';

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DndProvider>,
  root
);
//    registerServiceWorker();

//}, 5000);

unregister();
