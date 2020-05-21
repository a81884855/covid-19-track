import createDataContext from "./createDataContext";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_data":
      return {
        ...state,
        data: action.playload,
        series: [
          {
            name: "USA",
            data: action.playload.USA.case,
          },
          {
            name: "UK",
            data: action.playload.UK.case,
          },
          {
            name: "Russia",
            data: action.playload.Russia.case,
          },
        ],
      };
    case "add_series":
      return {
        ...state,
        series: [...state.series, action.playload],
      };
    default:
      return state;
  }
};

const fetchData = (dispatch) => async () => {
  let fetch_data;
  let data = {};
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

      data[each.country] = {
        case: caseArr,
        deaths,
        recovered,
      };
    }
  } catch (err) {
    console.log("Err", err);
  }

  dispatch({
    type: "fetch_data",
    playload: data,
  });
};

const addSeries = (dispatch) => async (state) => {
  dispatch({
    type: "add_series",
    playload: state,
  });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchData, addSeries },
  {
    data: [],
    series: [],
  }
);
