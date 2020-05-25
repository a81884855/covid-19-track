import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { Context as ChartContext } from "../context/ChartContext";
import ScrollAnimation from "react-animate-on-scroll";
import { MapLoading } from "../Component/MapLoading";
import { Paper } from "@material-ui/core";

import CountryIcons from "./CountryIcons";
import DataType from "./DataType";

const defaultSet = new Set(["UK", "Russia", "Brazil"]);

const ChartComponent = () => {
  const [active, setActive] = useState(defaultSet);

  const [info, setInfo] = useState("case");

  const {
    state: { loading, data, series },
    fetchData,
    setLoading,
    updateSeries,
  } = useContext(ChartContext);

  useEffect(() => {
    setLoading();
    fetchData(active, info);
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
      case "case":
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
      case "new_case":
        return data[country]["case"].map((num, i) =>
          i !== 0 ? num - data[country]["case"][i - 1] : null
        );
      default:
        return data[country]["case"];
    }
  };

  const handleActive = (target) => {
    if (active.has(target)) {
      active.delete(target);
    } else {
      active.add(target);
    }

    update(active);
    return setActive(new Set([...active]));
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

      <ScrollAnimation
        offset={250}
        animateIn="zoomInDown"
        animateOut="zoomOutDown"
      >
        <Paper
          style={{
            margin: "1rem",
            padding: "0.5rem",
          }}
          elevation={3}
        >
          <DataType info={info} infoChangeHandler={infoChangeHandler} />
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
