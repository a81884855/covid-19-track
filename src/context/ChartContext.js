import createDataContext from "./createDataContext";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_data":
      return {
        ...state,
        data: action.playload[0],
        series: action.playload[1],
        loading: false,
      };
    case "update_series":
      return {
        ...state,
        series: action.playload,
      };
    case "set_loading":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

const fetchData = (dispatch) => async (state, info, days) => {
  let fetch_data;
  let data = {};
  let series = [];

  try {
    fetch_data = await axios.get(
      `https://corona.lmao.ninja/v2/historical?lastdays=${days}`
    );

    for (let each of fetch_data.data) {
      let caseArr = [];
      let deaths = [];
      let recovered = [];

      for (let caseData in each.timeline.cases) {
        caseArr.push(each.timeline.cases[caseData]);
      }

      for (let deathsData in each.timeline.deaths) {
        deaths.push(each.timeline.deaths[deathsData]);
      }

      for (let recoveredData in each.timeline.recovered) {
        recovered.push(each.timeline.recovered[recoveredData]);
      }

      // In some cases, one country have mutilple provinces data
      if (data[each.country]) {
        for (let i in data[each.country].case) {
          data[each.country].case[i] += caseArr[i];
        }

        for (let i in data[each.country].deaths) {
          data[each.country].deaths[i] += deaths[i];
        }

        for (let i in data[each.country].recovered) {
          data[each.country].recovered[i] += recovered[i];
        }
      } else {
        data[each.country] = {
          case: caseArr,
          deaths,
          recovered,
        };
      }
    }
  } catch (err) {
    console.log("Err", err);
  }

  for (let country of state) {
    series.push({
      name: country,
      data: getData(data, country, info),
    });
  }

  dispatch({
    type: "fetch_data",
    playload: [data, series],
  });
};

const updateSeries = (dispatch) => (state) => {
  dispatch({
    type: "update_series",
    playload: state,
  });
};

const setLoading = (dispatch) => () => {
  dispatch({
    type: "set_loading",
  });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchData, updateSeries, setLoading },
  {
    data: [],
    series: [],
    loading: false,
  }
);

const getData = (data, country, type) => {
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
