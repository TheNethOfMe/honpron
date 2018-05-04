import axios from "axios";

import { GET_SERIES, GET_ERRORS } from "./types";

// create a series
export const createNewSeries = (seriesData, history) => dispatch => {
  axios
    .post("api/series/create", seriesData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get all series
export const getAllSeries = () => dispatch => {
  axios
    .get("/api/series")
    .then(res =>
      dispatch({
        type: GET_SERIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SERIES,
        payload: {}
      })
    );
};
