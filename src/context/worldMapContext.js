import createDataContext from "./createDataContext";
import rawData from "../Data/worldMapRaw.json";
import axios from "axios";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_data":
      return action.playload;
    default:
      return state;
  }
};

const fetchData = (dispatch) => async () => {
  let data = {};
  try {
    let caseData = await axios.get("https://api.covid19api.com/summary");
    for (let each of caseData.data.Countries) {
      data[each.Country] = each;
    }

    for (let countryData of rawData.objects.ne_110m_admin_0_countries
      .geometries) {
      if (!data[countryData.properties.NAME])
        console.log(countryData.properties.NAME);
      countryData.properties = data[countryData.properties.NAME]
        ? { ...countryData.properties, ...data[countryData.properties.NAME] }
        : countryData.properties;
    }
  } catch (err) {
    console.log(err, "World Map Fetch Data Error");
  }

  dispatch({ type: "fetch_data", playload: rawData });
};

// const fetchTracks = dispatch => async () => {
//   const response = await trackerApi.get("/tracks");
//   dispatch({ type: "fetch_tracks", playload: response.data });
// };
// const createTrack = dispatch => async (name, locations) => {
//   await trackerApi.post("/tracks", { name, locations });
// };

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchData },
  rawData
);
