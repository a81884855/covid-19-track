import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "animate.css/animate.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider as ChartDataProvider } from "./context/ChartContext";
import { Provider as MapDataProvider } from "./context/MapContext";
ReactDOM.render(
  <MapDataProvider>
    <ChartDataProvider>
      <App />
    </ChartDataProvider>
  </MapDataProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
