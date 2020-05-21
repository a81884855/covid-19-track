import React, { useState, useContext, useRef } from "react";
// import axios from "axios";
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { abbrev, rounded } from "../helper";
import { Context as MapContext } from "../context/MapContext";
import { MapLoading } from "../Component/MapLoading";
import { IoIosMore } from "react-icons/io";

const Board = () => {
  const {
    state: { caseData },
  } = useContext(MapContext);

  const [maxCount, setMaxCount] = useState(20);
  const [hover, setHover] = useState(false);
  const [more, setMore] = useState(false);
  const target = useRef(null);

  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: 50,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
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
              <tr
                style={{
                  textAlign: "center",
                }}
              >
                <th>#</th>
                <th>Location</th>
                <th>Case #</th>
                {!more ? (
                  <OverlayTrigger
                    target={target.current}
                    placement="top"
                    show={hover}
                    overlay={
                      <Tooltip
                        style={{
                          marginBottom: 5,
                        }}
                      >
                        More Detail
                      </Tooltip>
                    }
                  >
                    <th
                      ref={target}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      onClick={() => setMore(true)}
                      style={{
                        background: hover ? "turquoise" : "teal",
                      }}
                    >
                      <IoIosMore />
                    </th>
                  </OverlayTrigger>
                ) : (
                  <>
                    <th>Active_Case</th>
                    <th>Active_Rate</th>
                    <th>Death</th>
                    <th>Death_Rate</th>
                    <th>Recovered</th>
                    <th>Recovered_Rate</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody
              style={{
                textAlign: "center",
              }}
            >
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
                            fontSize: "0.55rem",
                          }}
                        >
                          {typeof NewConfirmed === "number"
                            ? ` + ${rounded(NewConfirmed)} new`
                            : "N/A"}
                        </div>
                      </td>

                      {more ? (
                        <>
                          <td className="testCase">
                            {TotalConfirmed - TotalDeaths - TotalRecovered}
                          </td>

                          <td className="activeCase">
                            {Number(
                              ((TotalConfirmed - TotalDeaths - TotalRecovered) *
                                100) /
                                TotalConfirmed
                            ).toFixed(1)}
                            %
                          </td>

                          <td className="deathCase">
                            {TotalDeaths}{" "}
                            <div
                              className="font-weight-bold"
                              style={{
                                fontSize: "0.55rem",
                              }}
                            >
                              {typeof NewConfirmed === "number"
                                ? ` + ${rounded(NewDeaths)} new`
                                : "N/A"}
                            </div>
                          </td>

                          <td className="deathRate font-weight-bold">
                            {Number(
                              (TotalDeaths / TotalConfirmed) * 100
                            ).toFixed(1)}
                            %
                          </td>

                          <td className="recoveredCase">
                            {TotalRecovered}{" "}
                            <div
                              className="font-weight-bold"
                              style={{
                                fontSize: "0.55rem",
                              }}
                            >
                              {typeof NewConfirmed === "number"
                                ? ` + ${rounded(NewRecovered)} new`
                                : "N/A"}
                            </div>
                          </td>

                          <td className="recoveredRate font-weight-bold">
                            {Number(
                              (TotalRecovered / TotalConfirmed) * 100
                            ).toFixed(1)}
                            %
                          </td>
                        </>
                      ) : (
                        <td></td>
                      )}
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
