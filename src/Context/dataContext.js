import createDataContext from "./createContext";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_countries_data":
      return {
        ...state,
        countries: action.playload.countries,
        mapCountries: action.playload.data,
        tableData: action.playload.sortedData,
      };
    case "fetch_country_info":
      return {
        ...state,
        countryInfo: action.playload,
      };
    case "handle_change_cases_type":
      return {
        ...state,
        casesType: action.playload,
      };
    case "handle_change_country":
      return {
        ...state,
        country: action.playload.country,
        countryInfo: action.playload.data,
        mapCenter: action.playload.mapCenter,
        mapZoom: action.playload.zoom,
      };
    case "fetch_history_data":
      return {
        ...state,
        historyData: action.playload.series,
        historyDays: action.playload.dates,
      };
    default:
      return {};
  }
};

const getCountryInfo = (dispatch) => async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/all");
  return dispatch({
    type: "fetch_country_info",
    playload: data,
  });
};

const getCountriesData = (dispatch) => async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  const countries = data.map((country) => ({
    name: country.country,
    value: country.countryInfo.iso2,
  }));
  countries.unshift({ name: "worldwide", value: "worldwide" });
  let sortedData = [...data].sort((a, b) => b.cases - a.cases);
  return dispatch({
    type: "fetch_countries_data",
    playload: { countries, data, sortedData },
  });
};

const handleChangeCaseTypes = (dispatch) => async (caseType) => {
  return dispatch({
    type: "handle_change_cases_type",
    playload: caseType,
  });
};

const handleChangeCountry = (dispatch) => async (country) => {
  const url =
    country === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${country}`;

  const { data } = await axios.get(url);
  const mapCenter = data.countryInfo
    ? [data.countryInfo.lat, data.countryInfo.long]
    : [34.80746, -40.4796];
  const zoom = 4;

  return dispatch({
    type: "handle_change_country",
    playload: { country, data, mapCenter, zoom },
  });
};

const fetchHistoryData = (dispatch) => async (country, caseType) => {
  const url =
    country === "worldwide"
      ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;

  let { data } = await axios.get(url);

  if (country !== "worldwide") data = data.timeline;

  const series = [
    {
      name: "country",
      data: Object.values(data[caseType]),
    },
  ];

  const dates = Object.keys(data[caseType]);

  return dispatch({
    type: "fetch_history_data",
    playload: { series, dates },
  });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  {
    getCountriesData,
    getCountryInfo,
    handleChangeCaseTypes,
    handleChangeCountry,
    fetchHistoryData,
  },
  {
    country: "worldwide",
    countryInfo: {},
    countries: [],
    mapCountries: [],
    tableData: [],
    casesType: "cases",
    mapCenter: { lat: 34.80746, lng: -40.4796 },
    mapZoom: 3,
    historyData: [],
    historyDays: [],
  }
);
