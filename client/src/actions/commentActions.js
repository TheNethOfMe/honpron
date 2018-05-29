import axios from "axios";

import { GET_COMMENTS, COM_LOADING } from "./types";

// get unmoderated comments
export const getUnmoddedComments = () => dispatch => {
  dispatch(setComLoading());
  axios
    .get("api/comment/admin")
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

export const setComLoading = () => {
  return {
    type: COM_LOADING
  };
};
