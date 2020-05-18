import React, { useState, useContext } from "react";
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
        >
          <Table striped borderless hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Country</th>
                <th>Case #</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              {caseData
                .slice(0, maxCount)
                .map(({ Country, TotalConfirmed, NewConfirmed }, i) => (
                  <tr key={Country}>
                    <td>{i + 1}</td>
                    <td>{abbrev(Country)}</td>
                    <td>
                      {TotalConfirmed}{" "}
                      <div
                        style={{
                          fontSize: "0.6rem",
                          color: "#427cd2",
                          fontWeight: "bold",
                        }}
                      >
                        {typeof NewConfirmed === "number"
                          ? ` + ${rounded(NewConfirmed)} new`
                          : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button
            variant="info"
            onClick={() => setMaxCount(maxCount + 20)}
            block
          >
            More...
          </Button>
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
