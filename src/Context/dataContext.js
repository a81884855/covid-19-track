import createDataContext from "./createContext";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "set_loading":
      return {
        ...state,
      };
    default:
      return {};
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  {},
  {
    country: "worldwide",
    countryInfo: {},
    countries: [],
    mapCountries: [],
    tableData: [],
    caseType: "case",
    mapCenter: { lat: 34.80746, lng: -40.4796 },
    mapZoom: 3,
  }
);
