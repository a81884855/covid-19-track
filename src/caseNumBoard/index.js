import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { abbrev } from "../helper";

const apiUrl = "https://api.covid19api.com/summary";
// const apiUrl = "http://localhost:4000/";
// https://api.covid19api.com/summary
// https://thevirustracker.com/free-api?global=stats

const Board = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get(`${apiUrl}`)
      .then((res) => {
        console.log(res.data);
        setData(
          res.data.Countries.sort((x, y) => y.TotalConfirmed - x.TotalConfirmed)
        );
      })
      .catch((error) => {
        console.log(error, "Error");
        setErr(error.data);
      });
  }, []);
  return (
    <div
    // style={{
    //   padding: 30,
    // }}
    >
      {!err ? (
        <>
          <h4>Total Cases</h4>
          <Table striped borderless hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Country</th>
                <th>Case #</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, i) => (
                <tr key={row.Country}>
                  <td>{i + 1}</td>
                  <td>{abbrev(row.Country)}</td>
                  <td>{row.TotalConfirmed}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div>Sorry... Some Error on fetching data {err}</div>
      )}
    </div>
  );
};

export default Board;
