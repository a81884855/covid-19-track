import React, { useContext } from "react";
import { Table as ReactstrapTable } from "reactstrap";
import { Context as dataContext } from "../Context/dataContext";
import "./table.css";

const Table = () => {
  const {
    state: { tableData, casesType },
  } = useContext(dataContext);
  return (
    <>
      <h4>
        Live <span id="casesType">{casesType}</span> by Country
      </h4>
      <div className="table">
        <ReactstrapTable striped>
          <tbody>
            {tableData.map((country) => (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td
                  style={{
                    textAlign: "right",
                  }}
                >
                  {country[casesType]}
                </td>
              </tr>
            ))}
          </tbody>
        </ReactstrapTable>
      </div>
    </>
  );
};

export default Table;
