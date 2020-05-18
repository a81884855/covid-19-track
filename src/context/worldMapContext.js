import createDataContext from "./createDataContext";
import rawData from "../Data/worldMapRaw.json";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "add_data":
      return { ...state, worldMapData: action.playload };
    case "fetch_data":
      return {
        ...state,
        caseData: action.playload[0],
        Global: action.playload[1],
      };
    default:
      return state;
  }
};

const fetchData = (dispatch) => async () => {
  let caseData;

  try {
    caseData = await axios.get("https://api.covid19api.com/summary");
  } catch (err) {
    console.log(err, "Error");
  }

  let data = caseData.data.Countries.sort(
    (x, y) => y.TotalConfirmed - x.TotalConfirmed
  );

  dispatch({
    type: "fetch_data",
    playload: [data, caseData.data.Global],
  });

  return data;
};

const addData = (dispatch) => async (state) => {
  let data = {};
  try {
    for (let each of state) {
      data[each.Country] = each;
    }

    for (let countryData of rawData.objects.ne_110m_admin_0_countries
      .geometries) {
      countryData.properties = data[countryData.properties.NAME]
        ? { ...countryData.properties, ...data[countryData.properties.NAME] }
        : countryData.properties;
    }
  } catch (err) {
    console.log(err, "World Map Fetch Data Error");
  }

  dispatch({ type: "add_data", playload: rawData });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { addData, fetchData },
  {
    Global: {
      NewConfirmed: null,
      TotalConfirmed: null,
      NewDeaths: null,
      TotalDeaths: null,
      NewRecovered: null,
      TotalRecovered: null,
    },
    caseData: [],
    worldMapData: rawData,
  }
);
