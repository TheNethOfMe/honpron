import axios from "axios";

import { GET_ERRORS, GET_MESSAGES, MSG_LOADING, GET_ONE_MSG } from "./types";

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

// compose a new message for admin
export const createAdminMessage = (messageData, history) => dispatch => {
  axios
    .post("/api/messages/admin", messageData)
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

// get admin messages
export const getAdminMessages = () => dispatch => {
  axios
    .get("/api/messages/admin")
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

// update message (for when a recipient or author deletes a message)
export const updateMessage = (id, updates, history) => dispatch => {
  axios
    .post(`/api/messages/delete/${id}`, updates)
    .then(res => dispatch(getAllMessages()))
    .catch(err => console.log(err));
};

// read a message (and set message status to read)
export const readMessage = id => dispatch => {
  dispatch(setMessageLoading());
  axios
    .get(`/api/messages/read/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_MSG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_MSG,
        payload: {}
      })
    );
};

// set messages loading
export const setMessageLoading = () => {
  return {
    type: MSG_LOADING
  };
};
