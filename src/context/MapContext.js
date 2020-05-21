import createDataContext from "./createDataContext";
import USRawData from "../Data/USMapRaw.json";
import WorldRawData from "../Data/worldMapRaw.json";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "set_loading":
      return {
        ...state,
        loading: true,
      };
    case "fetch_US_data":
      return {
        ...state,
        caseData: action.playload[0],
        mapSummaryData: action.playload[1],
        US_Case_Data: action.playload[2],
        loading: false,
      };
    case "fetch_world_data":
      return {
        ...state,
        caseData: action.playload[0],
        mapSummaryData: action.playload[1],
        worldMapData: action.playload[2],
        loading: false,
      };
    default:
      return state;
  }
};

const setLoading = (dispatch) => (state) => {
  return dispatch({
    type: "set_loading",
    // playload: true,
  });
};

const fetchWorldData = (dispatch) => async () => {
  let caseData;

  try {
    caseData = await axios.get("https://api.covid19api.com/summary");
  } catch (err) {
    console.log(err, "Error");
    return;
  }

  let data = caseData.data.Countries.sort(
    (x, y) => y.TotalConfirmed - x.TotalConfirmed
  );

  let state = {};

  try {
    for (let each of data) {
      state[each.Country] = each;
    }

    for (let countryData of WorldRawData.objects.ne_110m_admin_0_countries
      .geometries) {
      // if (!state[countryData.properties.NAME])
      //   console.log(countryData.properties.NAME);
      countryData.properties = state[countryData.properties.NAME]
        ? { ...countryData.properties, ...state[countryData.properties.NAME] }
        : countryData.properties;
    }
  } catch (err) {
    console.log(err, "World Map Fetch Data Error");
  }

  return dispatch({
    type: "fetch_world_data",
    playload: [data, caseData.data.Global, WorldRawData],
  });
};

const fetchUSData = (dispatch) => async () => {
  let fetch_case_data, fetch_summary_Data;
  let state = {};

  try {
    fetch_case_data = await axios.get(
      "https://corona.lmao.ninja/v2/states?sort"
    );
    fetch_summary_Data = await axios.get(
      "https://corona.lmao.ninja/v2/countries/usa"
    );
  } catch (err) {
    console.log(err, "Error");
    setTimeout(function () {
      console.log("Hello");
    }, 3000);
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

  try {
    for (let each of fetch_case_data.data) {
      state[each.state] = each;
    }

    for (let stateData of USRawData.objects.states.geometries) {
      stateData.properties = state[stateData.properties.name]
        ? { ...stateData.properties, ...state[stateData.properties.name] }
        : stateData.properties;
    }
  } catch (err) {
    console.log(err, "US Map Fetch Data Error");
  }

  dispatch({
    type: "fetch_US_data",
    playload: [caseData, summaryData, USRawData],
  });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchUSData, fetchWorldData, setLoading },
  {
    mapSummaryData: {},
    caseData: [],
    USMapData: USRawData,
    worldMapData: WorldRawData,
    loading: true,
  }
);
