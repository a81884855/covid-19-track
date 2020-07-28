const moment = require("moment");

module.exports = {
  dateLabel: (num) => {
    let arr = [];
    for (let i = 1; i <= num; i += 1) {
      arr.unshift(moment().subtract(i, "days").format("MM/DD"));
    }
    return arr;
  },

  rounded: (num) => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
    } else if (num > 10000) {
      return Math.round(num / 100) / 10 + "K";
    } else {
      return num;
    }
  },

  abbrev: (country) => {
    switch (country) {
      case "United States of America":
        return "Uninted States";
      case "Russian Federation":
        return "Russia";
      case "Iran, Islamic Republic of":
        return "Iran";
      default:
        return country;
    }
  },

  colorCalculate: (GlobalTotalConfirmed, TotalConfirmed) => {
    if (!TotalConfirmed) return 50;
    let percent = Math.floor(GlobalTotalConfirmed / TotalConfirmed);
    if (percent > 10000) {
      return 44 + Math.floor(GlobalTotalConfirmed / TotalConfirmed / 4000);
    } else if (percent > 1000) {
      return 33 + Math.floor(GlobalTotalConfirmed / TotalConfirmed / 400);
    } else if (percent > 100) {
      return 22 + Math.floor(GlobalTotalConfirmed / TotalConfirmed / 50);
    } else if (percent > 10) {
      return 11 + Math.floor(GlobalTotalConfirmed / TotalConfirmed / 5);
    } else {
      return Math.floor(GlobalTotalConfirmed / TotalConfirmed / 3);
    }
  },

  colorPick: (num) => {
    let colorSet = [
      "#710022",
      "#760426",
      "#7c0829",
      "#810c2d",
      "#861031",
      "#8b1435",
      "#901839",
      "#951c3d",
      "#9a2041",
      "#9f2445",
      "#a42748",
      "#a92b4c",
      "#ae2f50",
      "#b33354",
      "#b83757",
      "#bd3b5b",
      "#c23f5f",
      "#c74263",
      "#cc4666",
      "#cf4b6b",
      "#d25170",
      "#d65675",
      "#d95b7a",
      "#dc617f",
      "#df6684",
      "#e26b89",
      "#e5708d",
      "#e87592",
      "#eb7a97",
      "#ee7f9b",
      "#f184a0",
      "#f489a5",
      "#f78ea9",
      "#f993ae",
      "#fc98b3",
      "#ff9db7",
      "#fea4bc",
      "#fdabc1",
      "#fdb2c6",
      "#fcb8ca",
      "#fbbecf",
      "#fac5d3",
      "#facbd7",
      "#f9d1dc",
      "#f8d7e0",
      "#f8dde4",
      "#f7e3e9",
      "#f6e9ed",
      "#f6eff1",
      "#f5f5f5",
      "#f0f0f0",
    ];
    if (!num || num > colorSet.length - 1) return colorSet[colorSet.length - 1];

    return colorSet[num];
  },
};
