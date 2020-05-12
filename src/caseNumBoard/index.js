import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const apiUrl = "https://api.covid19api.com/summary";
// https://api.covid19api.com/summary
// https://thevirustracker.com/free-api?global=stats

const Board = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  const countryName = (country) => {
    switch (country) {
      case "United States of America":
        return "Uninted States";
      case "Russian Federation":
        return "Russia";
      default:
        return country;
    }
  };

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
        setErr(error);
      });
  }, []);
  return (
    <div
    // style={{
    //   padding: 30,
    // }}
    >
      <h4>Total Cases</h4>
      <Table striped bordered hover>
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
              <td>{countryName(row.Country)}</td>
              <td>{row.TotalConfirmed}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Board;
