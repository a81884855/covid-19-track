/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";

import { Context as dataContext } from "../Context/dataContext";
import ApexChart from "react-apexcharts";
import { rounded } from "../utils";

const Chart = () => {
  const {
    fetchHistoryData,
    state: { casesType, country, historyData, historyDays },
  } = useContext(dataContext);

  useEffect(() => {
    fetchHistoryData(country, casesType);
  }, [country, casesType]);

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
      width: 5,
      curve: "straight",
      dashArray: [0, 1, 3],
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
      categories: historyDays,
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return rounded(value);
        },
      },
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
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <div>
      <h4>History Data (Past 120 days)</h4>
      <ApexChart options={options} series={historyData} />
    </div>
  );
};

export default Chart;
