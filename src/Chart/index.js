/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { Context as ChartContext } from "../context/ChartContext";
import ScrollAnimation from "react-animate-on-scroll";
import { MapLoading } from "../Component/MapLoading";
import { Paper, FormControl, InputLabel, Select } from "@material-ui/core";
import { dateLabel } from "../helper";

import CountryIcons from "./CountryIcons";
import DataType from "./DataType";

const defaultSet = new Set(["USA", "India", "Brazil", "Russia"]);

const ChartComponent = () => {
  const [active, setActive] = useState(defaultSet);
  const [info, setInfo] = useState("new_case");
  const [days, setDays] = useState(14);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const {
    state: { loading, data, series },
    fetchData,
    setLoading,
    updateSeries,
  } = useContext(ChartContext);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    setLoading();
    fetchData(active, info, days);
  }, []);

  const update = (arr, type = null) => {
    let newSeries = [];

    for (let country of arr) {
      newSeries.push({
        name: country,
        data: getData(country, type),
      });
    }

    updateSeries(newSeries);
  };

  const infoChangeHandler = async (type) => {
    await setInfo(type);
    return update(active, type);
  };

  const getData = (country, type) => {
    switch (type) {
      case "new_case":
        return data[country]["case"].map((num, i) =>
          i !== 0 ? num - data[country]["case"][i - 1] : null
        );
      case "total_case":
        return data[country]["case"];
      case "deaths":
        return data[country]["deaths"];
      case "recovered":
        return data[country]["recovered"];
      case "recovered_rate":
        return data[country]["recovered"].map((num, i) =>
          Number((num / data[country]["case"][i]) * 100).toFixed(1)
        );
      case "death_rate":
        return data[country]["deaths"].map((num, i) =>
          Number((num / data[country]["case"][i]) * 100).toFixed(1)
        );
      default:
        return data[country]["case"];
    }
  };

  const handleActive = async (target) => {
    if (active.has(target)) {
      active.delete(target);
    } else {
      active.add(target);
    }

    await setActive(new Set([...active]));
    await update(active, info);
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
      width: 5,
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    title: {
      text: info,
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
      categories: dateLabel(days),
      labels: {
        style: {
          fontSize: "15px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "15px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
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
    <Paper
      style={{
        margin: "1.5rem ",
        padding: "1rem",
        minHeight: "100vh",
      }}
      elevation={3}
    >
      <div
        style={{
          margin: "1rem",
        }}
      >
        <h1>History Record</h1>
      </div>
      <ScrollAnimation
        offset={50}
        animateIn="zoomInDown"
        animateOut="zoomOutDown"
      >
        <CountryIcons active={active} handleActive={handleActive} />
      </ScrollAnimation>

      <ScrollAnimation offset={250} animateIn="zoomInDown" animateOut="rollOut">
        <Paper
          style={{
            margin: "1rem",
            padding: "0.5rem",
          }}
          elevation={3}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <DataType info={info} infoChangeHandler={infoChangeHandler} />
            <FormControl
              variant="outlined"
              style={{
                margin: 5,
                minWidth: 120,
                // padding: 10,
                marginTop: 10,
              }}
            >
              <InputLabel ref={inputLabel}>Data Range</InputLabel>
              <Select
                style={{
                  marginTop: 10,
                }}
                native
                value={days}
                labelWidth={labelWidth}
                onChange={async (e) => {
                  let days = e.target.value;
                  await setDays(days);
                  await fetchData(active, info, days);
                }}
              >
                <option value={14}>2 Weeks</option>
                <option value={7}>1 Week</option>
                <option value={21}>3 Weeks</option>
                <option value={30}>1 Month</option>
                <option value={60}>2 Month</option>
              </Select>
            </FormControl>
          </div>

          {!loading ? (
            <Chart options={options} series={series} height={600} />
          ) : (
            <MapLoading />
          )}
        </Paper>
      </ScrollAnimation>
    </Paper>
  );
};

export default ChartComponent;
