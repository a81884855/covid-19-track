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
    case "fetch_news_data":
      return {
        ...state,
        newsData: action.playload,
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

const getNewsData = (dispatch) => async () => {
  let apiToken = "20b210fc6e08d7caf9593096e09dd6c4";
  const { data } = await axios.get(
    `https://gnews.io/api/v3/search?q=covid-19&token=${apiToken}`
  );
  return dispatch({
    type: "fetch_news_data",
    playload: data.articles,
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
  const zoom = 5;

  return dispatch({
    type: "handle_change_country",
    playload: { country, data, mapCenter, zoom },
  });
};

const fetchHistoryData = (dispatch) => async (country) => {
  const url =
    country === "worldwide"
      ? "https://disease.sh/v3/covid-19/historical/all?lastdays=121"
      : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=121`;

  let { data } = await axios.get(url);

  if (country !== "worldwide") data = data.timeline;

  let caseTypes = ["cases", "recovered", "deaths"];

  const series = caseTypes.map((caseType) => {
    const objectValue = Object.values(data[caseType]);
    const seriesData = objectValue.map((each, i) =>
      objectValue[i + 1] - each > 0 ? objectValue[i + 1] - each : 0
    );
    seriesData.pop();
    return {
      name: `${caseType.charAt(0).toUpperCase()}${caseType.slice(1)}`,
      data: seriesData,
    };
  });

  const dates = Object.keys(data["cases"]).slice(1);

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
    getNewsData,
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
    newsData: [],
  }
);
