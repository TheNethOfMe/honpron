import axios from "axios";

import {
  GET_TICKETS,
  TICKETS_LOADING,
  GET_ERRORS,
  GET_ONE_TICKET,
  TICKETS_CLEAR
} from "./types";

// create a ticket
export const contactUs = ticketData => dispatch => {
  axios
    .post("/api/tickets", ticketData)
    .then(res => console.log("Success"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// get all tickets
export const getTickets = () => dispatch => {
  dispatch(setTicketsLoading());
  axios
    .get("/api/tickets")
    .then(res => {
      dispatch({
        type: GET_TICKETS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TICKETS,
        payload: {}
      })
    );
};

// get one ticket
export const getOneTicket = id => dispatch => {
  dispatch(setTicketsLoading());
  axios
    .get(`/api/tickets/read/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_TICKET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_TICKET,
        payload: {}
      })
    );
};

// update a ticket (respond and/or close)
export const updateTicket = (id, updates) => dispatch => {
  axios
    .post(`/api/tickets/update/${id}`, updates)
    .then(res => console.log("Success"))
    .catch(err => console.log(err));
};

// delete a closed ticket
export const deleteTicket = (id, history) => dispatch => {
  axios
    .delete(`/api/tickets/delete/${id}`)
    .then(res => history.push("/get-admin-messages"))
    .catch(err => console.log(err));
};

export const setTicketsLoading = () => {
  return {
    type: TICKETS_LOADING
  };
};

// clear tickets on logout
export const clearTickets = () => {
  return {
    type: TICKETS_CLEAR
  };
};
