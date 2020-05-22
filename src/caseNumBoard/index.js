import React, { useContext } from "react";
import { Context as MapContext } from "../context/MapContext";
import { MapLoading } from "../Component/MapLoading";

import Table from "./Table";

const Board = () => {
  const {
    state: { caseData },
  } = useContext(MapContext);

  return (
    <>{!!caseData.length ? <Table caseData={caseData} /> : <MapLoading />}</>
  );
};

export default Board;
