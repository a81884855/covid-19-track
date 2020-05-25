import React from "react";
import { Button } from "react-bootstrap";

const infoSet = [
  { value: "case", name: "Confirmed Case", variant: "primary" },
  { value: "deaths", name: "Deaths", variant: "danger" },
  { value: "recovered", name: "Recovered", variant: "success" },
  { value: "new_case", name: "New Case", variant: "info" },
  { value: "recovered_rate", name: "Recovered_Rate", variant: "warning" },
  { value: "death_rate", name: "Death_Rate", variant: "dark" },
];

export default function DataType({ info, infoChangeHandler }) {
  return (
    <div
      style={{
        padding: "1.5rem 1rem",
        flex: 10,
      }}
    >
      {infoSet.map(({ name, variant, value }) => (
        <Button
          style={{
            margin: 4,
          }}
          key={name}
          variant={`${info !== value ? "outline-" : ""}${variant}`}
          onClick={() => {
            infoChangeHandler(value);
          }}
          size="sm"
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
