import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { abbrev, rounded } from "../helper";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoIosMore } from "react-icons/io";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100vh",
    marginTop: 50,
  },
});

export default function StickyHeadTable({ caseData }) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);
  const [more, setMore] = useState(false);
  const target = useRef(null);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Case #</TableCell>
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
                  <TableCell
                    align="center"
                    ref={target}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => setMore(true)}
                    style={{
                      background: hover ? "grey" : "gainsboro",
                    }}
                  >
                    <IoIosMore />
                  </TableCell>
                </OverlayTrigger>
              ) : (
                <>
                  <TableCell align="center">Active_Case</TableCell>
                  <TableCell align="center">Active_Rate</TableCell>
                  <TableCell align="center">Death</TableCell>
                  <TableCell align="center">Death_Rate</TableCell>
                  <TableCell align="center">Recovered</TableCell>
                  <TableCell align="center">Recovered_Rate</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody align="center">
            {caseData.map(
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
              ) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={Country}>
                    <TableCell align="center">{i + 1}</TableCell>
                    <TableCell align="center">{abbrev(Country)}</TableCell>
                    <TableCell align="center" className="confirmedCase">
                      {TotalConfirmed}
                      <div
                        style={{
                          fontSize: "0.55rem",
                        }}
                      >
                        {typeof NewConfirmed === "number"
                          ? ` + ${rounded(NewConfirmed)} new`
                          : "N/A"}
                      </div>
                    </TableCell>
                    {more ? (
                      <>
                        <TableCell align="center" className="testCase">
                          {TotalConfirmed - TotalDeaths - TotalRecovered}
                        </TableCell>

                        <TableCell
                          align="center"
                          className="font-weight-bold activeCase"
                        >
                          {Number(
                            ((TotalConfirmed - TotalDeaths - TotalRecovered) *
                              100) /
                              TotalConfirmed
                          ).toFixed(1)}
                          %
                        </TableCell>

                        <TableCell align="center" className="deathCase">
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
                        </TableCell>

                        <TableCell
                          align="center"
                          className="deathRate font-weight-bold"
                        >
                          {Number((TotalDeaths / TotalConfirmed) * 100).toFixed(
                            1
                          )}
                          %
                        </TableCell>

                        <TableCell align="center" className="recoveredCase">
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
                        </TableCell>

                        <TableCell
                          align="center"
                          className="recoveredRate font-weight-bold"
                        >
                          {Number(
                            (TotalRecovered / TotalConfirmed) * 100
                          ).toFixed(1)}
                          %
                        </TableCell>
                      </>
                    ) : (
                      <TableCell />
                    )}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
