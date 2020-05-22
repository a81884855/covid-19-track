import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { Context as ChartContext } from "../context/ChartContext";
import CountryIcons from "./CountryIcons";
import ScrollAnimation from "react-animate-on-scroll";

const defaultSet = new Set(["USA", "UK", "Russia", "Brazil"]);

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

  const update = (arr) => {
    let newSeries = [];

    for (let country of arr) {
      newSeries.push({
        name: country,
        data: data[country][info],
      });
    }

    updateSeries(newSeries);
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

  // const handleActive = () => {
  //   setActive(!active);
  // };

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
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <ScrollAnimation offset={350} animateIn="zoomIn">
      <div
        style={{
          margin: "0.3rem 1rem",
          padding: "0 1rem",
        }}
      >
        <ScrollAnimation offset={250} animateIn="bounceIn" delay={1000}>
          <CountryIcons active={active} handleActive={handleActive} />
        </ScrollAnimation>

        {!loading ? (
          <Chart options={options} series={series} height={550} />
        ) : (
          <p>Loading</p>
        )}
      </div>
    </ScrollAnimation>
  );
};

export default ChartComponent;
