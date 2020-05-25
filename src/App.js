import React from "react";

import "./App.css";

import Nav from "./Layout/Navbar";
import MapChart from "./Map";
import Chart from "./Chart";

function App() {
  return (
    <>
      <Nav />
      <MapChart />
      <Chart />
    </>
  );
}

export default App;
