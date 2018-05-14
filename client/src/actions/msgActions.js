import axios from "axios";

import { GET_ERRORS, GET_MESSAGES, MSG_LOADING } from "./types";

// compose a new message
export const createNewMessage = (messageData, history) => dispatch => {
  axios
    .post("/api/messages", messageData)
    .then(res => history.push("/userDashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get all messages
export const getAllMessages = () => dispatch => {
  dispatch(setMessageLoading());
  axios
    .get("/api/messages")
    .then(res =>
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MESSAGES,
        payload: {}
      })
    );
};

export const updateMessage = (id, updates, history) => dispatch => {
  axios
    .post(`/api/messages/${id}`, updates)
    .then(res => dispatch(getAllMessages()))
    .catch(err => console.log(err));
};

// set messages loading
export const setMessageLoading = () => {
  return {
    type: MSG_LOADING
  };
};
