module.exports = {
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
      default:
        return country;
    }
  },
};
