import React from "react";
import { Popover, PopoverContent } from "react-bootstrap";
import { rounded, abbrev } from "../helper";
import "./PopoverComp.css";

const PopComp = ({
  NAME,
  TotalConfirmed,
  NewConfirmed,
  TotalDeaths,
  NewDeaths,
  TotalRecovered,
  NewRecovered,
  Test,
}) => {
  return (
    <Popover>
      <Popover.Title as="h3">{abbrev(NAME)}</Popover.Title>
      <PopoverContent>
        <div>
          <span
            style={{
              fontSize: "0.7rem",
            }}
          >
            Total Confirmed:{" "}
          </span>
          <span className="confirmedCase">{rounded(TotalConfirmed)}</span>
          <span
            className="confirmedCase font-weight-bold"
            style={{
              fontSize: "0.6rem",
            }}
          >
            {typeof NewConfirmed === "number"
              ? ` + ${rounded(NewConfirmed)} new`
              : "N/A"}
          </span>
        </div>

        {TotalDeaths && (
          <div>
            <span
              style={{
                fontSize: "0.7rem",
              }}
            >
              Total Deaths:{" "}
            </span>
            <span className="deathCase">{rounded(TotalDeaths)}</span>
            <span
              className="deathCase font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {typeof NewDeaths === "number"
                ? ` + ${rounded(NewDeaths)} new`
                : "N/A"}
            </span>
          </div>
        )}

        {TotalRecovered && (
          <div>
            <span
              style={{
                fontSize: "0.7rem",
              }}
            >
              Total Recovered:{" "}
            </span>
            <span className="recoveredCase">{rounded(TotalRecovered)}</span>
            <span
              className="recoveredCase font-weight-bold"
              style={{
                fontSize: "0.6rem",
              }}
            >
              {typeof NewRecovered === "number"
                ? ` + ${rounded(NewRecovered)} new`
                : "N/A"}
            </span>
          </div>
        )}

        {Test && (
          <div>
            <span
              style={{
                fontSize: "0.75rem",
              }}
            >
              Total Test:{"  "}
            </span>
            <span className="testCase">{rounded(Test)}</span>
            <span
              className="testCase font-weight-bold"
              style={{
                fontSize: "0.65rem",
              }}
            >
              {typeof Test === "number"
                ? `${" ("}${Number((TotalConfirmed / Test) * 100).toFixed(
                    1
                  )}% Confirmed)`
                : "N/A"}
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default PopComp;
