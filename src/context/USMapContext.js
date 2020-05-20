import createDataContext from "./createDataContext";
import rawData from "../Data/USMapRaw.json";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "add_data":
      return { ...state, worldMapData: action.playload };
    case "fetch_data":
      return {
        ...state,
        caseData: action.playload[0],
        summaryData: action.playload[1],
      };
    default:
      return state;
  }
};

const fetchData = (dispatch) => async () => {
  let caseData, summaryData;

  try {
    caseData = await axios.get("https://corona.lmao.ninja/v2/states?sort");
    summaryData = await axios.get(
      "https://corona.lmao.ninja/v2/countries/usa?strict"
    );
  } catch (err) {
    console.log(err, "Error");
  }

  dispatch({
    type: "fetch_data",
    playload: [caseData.data, summaryData.data],
  });

  return caseData.data;
};

const addData = (dispatch) => async (state) => {
  let data = {};
  try {
    for (let each of state) {
      data[each.state] = each;
    }

    for (let stateData of rawData.objects.states.geometries) {
      stateData.properties = data[stateData.properties.name]
        ? { ...stateData.properties, ...data[stateData.properties.name] }
        : stateData.properties;
    }
  } catch (err) {
    console.log(err, "US Map Fetch Data Error");
  }

  dispatch({ type: "add_data", playload: rawData });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { addData, fetchData },
  {
    summaryData: [],
    caseData: [],
    USMapData: rawData,
  }
);
