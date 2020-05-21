import React, { useState, useContext } from "react";
// import axios from "axios";
import { Table } from "react-bootstrap";
import { abbrev, rounded } from "../helper";
import { Context as MapContext } from "../context/MapContext";
import { MapLoading } from "../Component/MapLoading";

const Board = () => {
  const {
    state: { caseData },
  } = useContext(MapContext);

  const [maxCount, setMaxCount] = useState(20);

  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: 50,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* <h3>World Statistics</h3> */}
      {!!caseData.length ? (
        <div
          style={{
            overflow: "scroll",
            height: "100vh",
          }}
          onScroll={(e) => {
            if (e.target.scrollHeight - e.target.scrollTop === 700)
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
                <th>Location</th>
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
                    <tr className="font-weight-bold" key={Country}>
                      <td>{i + 1}</td>
                      <td>{abbrev(Country)}</td>
                      <td className="confirmedCase">
                        {TotalConfirmed}{" "}
                        <div
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
        <MapLoading />
      )}
    </div>
  );
};

export default Board;
