import axios from "axios";

import { GET_ENTRIES, ENTRY_LOADING, GET_ERRORS } from "./types";

// create a new entry
export const createNewEntry = (entryData, history) => dispatch => {
  axios
    .post("api/entries/create", entryData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get all entries
export const getAllEntries = () => dispatch => {
  dispatch(setEntryLoading());
  axios
    .get("/api/entries")
    .then(res =>
      dispatch({
        type: GET_ENTRIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ENTRIES,
        payload: {}
      })
    );
};

// entry loading
export const setEntryLoading = () => {
  return {
    type: ENTRY_LOADING
  };
};
