import axios from "axios";

import { GET_ERRORS, GET_MESSAGES, MSG_LOADING, GET_ONE_MSG } from "./types";

import { updateTicket } from "./ticketActions";

// compose a new message
export const createNewMessage = (messageData, history) => dispatch => {
  axios
    .post("/api/messages", messageData)
    .then(res => history.push("/user-dashboard"))
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

// update message (for when a recipient or author deletes a message)
export const updateMessage = (id, updates) => dispatch => {
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

// sends user a message from Honest Piranha Labs
export const ticketResponse = (id, messageData, ticketData) => dispatch => {
  axios
    .post("/api/messages/admin", messageData)
    .then(res => dispatch(updateTicket(id, ticketData)))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// used for clearing all messages related to a user
export const clearAllMessages = (id, updates) => dispatch => {
  axios
    .post(`/api/messages/delete/${id}`, updates)
    .then(res => console.log("Deleted"))
    .catch(err => console.log(err));
};
