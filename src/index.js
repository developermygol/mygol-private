import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App";
import { unregister } from "./registerServiceWorker";
//import registerServiceWorker from './registerServiceWorker';

// const wait = setInterval(() => {
//     clearInterval(wait);

const root = document.getElementById("root");
const body = document.getElementsByTagName("body")[0];
body.className = "loaded";

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>,
  root
);
//    registerServiceWorker();

//}, 5000);

unregister();
