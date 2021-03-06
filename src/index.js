import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider as DataProvider } from "./Context/dataContext";

import "react-widgets/dist/css/react-widgets.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  // <React.StrictMode>
  <DataProvider>
    <App />
  </DataProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
