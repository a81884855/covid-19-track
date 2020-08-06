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
    default:
      return {};
  }
};

const getCountriesData = (dispatch) => async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  const countries = data.map((country) => ({
    name: country.country,
    valye: country.countryInfo.iso2,
  }));
  let sortedData = [...data].sort((a, b) => b.cases - a.cases);
  return dispatch({
    type: "fetch_countries_data",
    playload: { countries, data, sortedData },
  });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { getCountriesData },
  {
    country: "worldwide",
    countryInfo: {},
    countries: [],
    mapCountries: [],
    tableData: [],
    casesType: "cases",
    mapCenter: { lat: 34.80746, lng: -40.4796 },
    mapZoom: 3,
  }
);
