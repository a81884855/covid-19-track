import React, { useState, useContext } from "react";
// import axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import { abbrev, rounded } from "../helper";
import { Context as WorldMapContext } from "../context/worldMapContext";

const Board = () => {
  const {
    state: { caseData },
  } = useContext(WorldMapContext);

  const [maxCount, setMaxCount] = useState(20);

  return (
    <>
      <h3>World Statistics</h3>
      {!!caseData.length ? (
        <div
          style={{
            marginTop: 20,
            height: 600,
            overflow: "scroll",
          }}
          onScroll={(e) => {
            if (e.target.scrollHeight - e.target.scrollTop === 470)
              setMaxCount(maxCount + 20);
          }}
        >
          <Table borderless hover>
            <thead
              style={{
                background: "black",
                color: "white",
              }}
            >
              <tr>
                <th>#</th>
                <th>Country</th>
                <th>Case #</th>
                {/* <th>Death</th>
                <th>Recovered</th> */}
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

                      {/* <td className="deathCase">
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
                      </td> */}
                    </tr>
                  )
                )}
            </tbody>
          </Table>
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
