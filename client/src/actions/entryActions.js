import axios from "axios";

import {
  GET_ENTRIES,
  ENTRY_LOADING,
  GET_ERRORS,
  GET_ONE_ENTRY,
  CLEAR_ENTRY
} from "./types";

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

// get one entry
export const getOneEntry = id => dispatch => {
  dispatch(setEntryLoading());
  axios
    .get(`/api/entries/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_ENTRY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_ENTRY,
        payload: {}
      })
    );
};

// update an entry
export const updateEntry = (id, updates, history) => dispatch => {
  axios
    .post(`/api/entries/${id}`, updates)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete an entry from database
export const deleteEntry = (id, history) => dispatch => {
  axios.delete(`/api/entries/${id}`).then(res => dispatch(getAllEntries()));
};

// clear single entry from store
export const clearEntry = () => {
  return {
    type: CLEAR_ENTRY
  };
};

// entry loading
export const setEntryLoading = () => {
  return {
    type: ENTRY_LOADING
  };
};
