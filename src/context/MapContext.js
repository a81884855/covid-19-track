import createDataContext from "./createDataContext";
import USRawData from "../Data/USMapRaw.json";
import WorldRawData from "../Data/worldMapRaw.json";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "add_US_data":
      return { ...state, US_Case_Data: action.playload, loading: false };
    case "fetch_US_data":
      return {
        ...state,
        caseData: action.playload[0],
        mapSummaryData: action.playload[1],
        loading: true,
      };
    case "fetch_world_data":
      return {
        ...state,
        caseData: action.playload[0],
        mapSummaryData: action.playload[1],
        loading: true,
      };
    case "add_world_data":
      return { ...state, World_Case_Data: action.playload, loading: false };
    default:
      return state;
  }
};

const fetchWorldData = (dispatch) => async () => {
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
    type: "fetch_world_data",
    playload: [data, caseData.data.Global],
  });

  return data;
};

const addWorldData = (dispatch) => async (state) => {
  let data = {};
  try {
    for (let each of state) {
      data[each.Country] = each;
    }

    for (let countryData of WorldRawData.objects.ne_110m_admin_0_countries
      .geometries) {
      countryData.properties = data[countryData.properties.NAME]
        ? { ...countryData.properties, ...data[countryData.properties.NAME] }
        : countryData.properties;
    }
  } catch (err) {
    console.log(err, "World Map Fetch Data Error");
  }

  dispatch({ type: "add_wolrd_data", playload: WorldRawData });
};

const fetchUSData = (dispatch) => async () => {
  let fetch_case_data, fetch_summary_Data;

  try {
    fetch_case_data = await axios.get(
      "https://corona.lmao.ninja/v2/states?sort"
    );
    fetch_summary_Data = await axios.get(
      "https://corona.lmao.ninja/v2/countries/usa"
    );
  } catch (err) {
    console.log(err, "Error");
  }

  const {
    cases,
    todayCases,
    recovered,
    deaths,
    todayDeaths,
    tests,
    testsPerOneMillion,
  } = fetch_summary_Data.data;

  const summaryData = {
    TotalConfirmed: cases,
    NewConfirmed: todayCases,
    TotalRecovered: recovered,
    NewRecovered: null,
    TotalDeaths: deaths,
    NewDeaths: todayDeaths,
    Test: tests,
    TestsPerOneMillion: testsPerOneMillion,
  };

  let caseData = [];
  for (let data of fetch_case_data.data) {
    caseData.push({
      Country: data.state,
      TotalConfirmed: data.cases,
      NewConfirmed: data.todayCases,
    });
  }

  dispatch({
    type: "fetch_US_data",
    playload: [caseData, summaryData],
  });

  return fetch_case_data.data;
};

const addUSData = (dispatch) => async (state) => {
  let data = {};
  try {
    for (let each of state) {
      data[each.state] = each;
    }

    for (let stateData of USRawData.objects.states.geometries) {
      stateData.properties = data[stateData.properties.name]
        ? { ...stateData.properties, ...data[stateData.properties.name] }
        : stateData.properties;
    }
  } catch (err) {
    console.log(err, "US Map Fetch Data Error");
  }

  dispatch({ type: "add_US_data", playload: USRawData });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { addUSData, fetchUSData, fetchWorldData, addWorldData },
  {
    mapSummaryData: {},
    caseData: [],
    USMapData: USRawData,
    worldMapData: WorldRawData,
    loading: true,
  }
);
