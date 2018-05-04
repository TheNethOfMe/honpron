import axios from "axios";

import { GET_ENTRIES, ENTRY_LOADING } from "./types";

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
