import React from "react";

import "./App.css";

import Nav from "./Layout/Navbar";
import MapChart from "./Map";
import Chart from "./Chart";
import Footer from "./Layout/Footer";

function App() {
  return (
    <>
      <Nav />
      <MapChart />
      <Chart />
      <Footer />
    </>
  );
}

export default App;
