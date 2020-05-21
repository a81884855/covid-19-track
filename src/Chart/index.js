import React, { useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { Context as ChartContext } from "../context/ChartContext";

const ChartComponent = () => {
  const {
    state: { loading, data, series },
    fetchData,
    setLoading,
    addSeries,
  } = useContext(ChartContext);

  useEffect(() => {
    setLoading();
    fetchData();
  }, []);

  console.log("data", data);

  const add = () => {
    addSeries({
      name: "Brazil",
      data: data.Brazil.case,
    });
  };

  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    title: {
      text: "World Statistics",
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
        "5/6",
        "5/7",
        "5/8",
        "5/9",
        "5/10",
        "5/11",
        "5/12",
        "5/13",
        "5/14",
        "5/15",
        "5/16",
        "5/17",
        "5/18",
        "5/19",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <div
      style={{
        margin: "0.3rem 1rem",
        padding: "0 1rem",
      }}
    >
      <button onClick={add}>Add</button>
      {!loading ? (
        <Chart options={options} series={series} height={550} />
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
export default ChartComponent;
