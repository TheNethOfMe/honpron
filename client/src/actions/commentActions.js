import axios from "axios";

import { GET_COMMENTS, COM_LOADING, GET_ERRORS } from "./types";

// get unmoderated comments
export const getUnmoddedComments = () => dispatch => {
  dispatch(setComLoading());
  axios
    .get("/api/comment/admin")
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COMMENTS,
        payload: []
      });
    });
};

// get entry's comments
export const getEntryComments = entryId => dispatch => {
  dispatch(setComLoading());
  axios
    .get(`/api/comment/entry/${entryId}`)
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COMMENTS,
        payload: []
      });
    });
};

// post a new comment
export const createNewComment = commentData => dispatch => {
  axios
    .post("/api/comment", commentData)
    .then()
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setComLoading = () => {
  return {
    type: COM_LOADING
  };
};
