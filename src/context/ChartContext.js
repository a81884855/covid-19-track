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

const fetchData = (dispatch) => async (state, info) => {
  let fetch_data;
  let data = {};
  let series = [];

  try {
    fetch_data = await axios.get(
      "https://corona.lmao.ninja/v2/historical?lastdays=14"
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
          data[each.country].case[i] += deaths[i];
        }

        for (let i in data[each.country].recovered) {
          data[each.country].case[i] += recovered[i];
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
      data: data[country][info],
    });
  }

  dispatch({
    type: "fetch_data",
    playload: [data, series],
  });
};

const updateSeries = (dispatch) => (state) => {
  console.log(state, "update");
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
