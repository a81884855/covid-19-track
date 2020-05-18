import React, { useState, useContext, lazy, Suspense } from "react";
// import axios from "axios";
import { Table, Spinner, Button } from "react-bootstrap";
import { abbrev, rounded } from "../helper";
import { Context as WorldMapContext } from "../context/worldMapContext";

const Board = () => {
  const {
    state: { caseData },
    // fetchData,
  } = useContext(WorldMapContext);

  const [maxCount, setMaxCount] = useState(20);

  return (
    <>
      <h4>Total Cases</h4>
      {!!caseData.length ? (
        <div
          style={{
            height: 470,
            overflow: "scroll",
          }}
          onScroll={(e) => {
            if (e.target.scrollHeight - e.target.scrollTop === 470)
              setMaxCount(maxCount + 20);
          }}
        >
          <Table striped borderless hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Country</th>
                <th>Case #</th>
                <th>Death</th>
                <th>Recovered</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              {caseData
                .slice(0, maxCount)
                .map(
                  (
                    {
                      Country,
                      TotalConfirmed,
                      NewConfirmed,
                      NewDeaths,
                      TotalDeaths,
                      NewRecovered,
                      TotalRecovered,
                    },
                    i
                  ) => (
                    <tr key={Country}>
                      <td>{i + 1}</td>
                      <td>{abbrev(Country)}</td>
                      <td className="confirmedCase">
                        {TotalConfirmed}{" "}
                        <div
                          className="font-weight-bold"
                          style={{
                            fontSize: "0.6rem",
                          }}
                        >
                          {typeof NewConfirmed === "number"
                            ? ` + ${rounded(NewConfirmed)} new`
                            : "N/A"}
                        </div>
                      </td>
                      <td className="deathCase">
                        {TotalDeaths}{" "}
                        <div
                          className="font-weight-bold"
                          style={{
                            fontSize: "0.6rem",
                          }}
                        >
                          {typeof NewConfirmed === "number"
                            ? ` + ${rounded(NewDeaths)} new`
                            : "N/A"}
                        </div>
                      </td>
                      <td className="recoveredCase">
                        {TotalRecovered}{" "}
                        <div
                          className="font-weight-bold"
                          style={{
                            fontSize: "0.6rem",
                          }}
                        >
                          {typeof NewConfirmed === "number"
                            ? ` + ${rounded(NewRecovered)} new`
                            : "N/A"}
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
          <Suspense fallback={<h1>Loading…</h1>}></Suspense>
          {/* <Button
            variant="info"
            onClick={() => setMaxCount(maxCount + 20)}
            block
          >
            More...
          </Button> */}
        </div>
      ) : (
        <div
          style={{
            padding: 20,
          }}
        >
          <h3>
            <Spinner animation="grow" /> Loading...
          </h3>
        </div>
      )}
    </>
  );
};

export default Board;
