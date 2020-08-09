import React, { useContext } from "react";
import ReactTable from "react-table-6";
import { Card } from "reactstrap";
import { Context as dataContext } from "../Context/dataContext";
import "./CountriesTable.css";

const columns = [
  {
    Header: "Name",
    accessor: "country", // String-based value accessors!
    style: { textAlign: "center" },
  },
  {
    Header: "Active",
    accessor: "active",
    style: { textAlign: "center" },
  },
  {
    Header: "Cases",
    accessor: "cases",
    style: { textAlign: "center" },
  },
  {
    Header: "Today Cases",
    accessor: "todayCases",
    style: { textAlign: "center" },
  },
  {
    Header: "Recovered",
    accessor: "recovered",
    style: { textAlign: "center" },
  },
  {
    Header: "Today Recovered",
    accessor: "todayDeaths",
    style: { textAlign: "center" },
  },
  {
    Header: "Deaths",
    accessor: "deaths",
    style: { textAlign: "center" },
  },
  {
    Header: "Today deaths",
    accessor: "todayDeaths",
    style: { textAlign: "center" },
  },
];

const CountriesTable = () => {
  const {
    state: { tableData },
  } = useContext(dataContext);
  return (
    <Card className="countries-table-container">
      <h4>Worldwide Details</h4>
      <ReactTable
        defaultPageSize={15}
        className="-striped -highlight"
        data={tableData}
        columns={columns}
      />
    </Card>
  );
};

export default CountriesTable;
