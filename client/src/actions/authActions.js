import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_ALL_USERS,
  SET_USER_LOADING,
  MESSAGE_CLEAR,
  CLEAR_USER_DATA,
  GET_BLOCK_LIST
} from "./types";

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register admin
export const registerAdmin = (adminData, history) => dispatch => {
  axios
    .post("/api/users/admin", adminData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(clearUserData());
  dispatch({
    type: MESSAGE_CLEAR
  });
  history.push("/");
};

// Get user list
export const getUsers = () => dispatch => {
  dispatch(setUserLoading());
  axios.get("/api/users/modify").then(res =>
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    })
  );
};

// Clear user list and blocklist on logout
export const clearUserData = () => dispatch => {
  dispatch({
    type: CLEAR_USER_DATA
  });
};

// Modify a user's status
export const modifyUserStatus = (id, status) => dispatch => {
  axios
    .post(`/api/users/modify/${id}`, status)
    .then(res => dispatch(getUsers()));
};

// Update user's email
export const modifyUserEmail = (userData, history) => dispatch => {
  axios
    .post("/api/users/email", userData)
    .then(res => history.push("/user-dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// adds a user to another user's block list
export const blockUser = (update, history) => dispatch => {
  axios.post("/api/users/block", update).then(res => {
    history.push("/get-messages");
  });
};

// removes a user from another user's block list
export const unblockUser = (update, history) => dispatch => {
  axios.post("/api/users/unblock", update).then(res => {
    history.push("/my-block-list");
    dispatch(getBlockList());
  });
};

// retrieves the blocklist and adds it to state
export const getBlockList = () => dispatch => {
  dispatch(setUserLoading());
  axios.get("/api/users/blocklist").then(res => {
    dispatch({
      type: GET_BLOCK_LIST,
      payload: res.data
    });
  });
};

// logs out the user and deletes their account
export const deleteAccount = history => dispatch => {
  axios.delete("/api/users").then(res => dispatch(logoutUser(history)));
};

// Set user loading
export const setUserLoading = () => {
  return {
    type: SET_USER_LOADING
  };
};
