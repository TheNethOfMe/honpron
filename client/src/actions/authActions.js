import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_ALL_USERS,
  SET_USER_LOADING
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
    .then(res => history.push("/login")) // CHANGE THIS to go to dashboard later
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
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
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
    .then(res => history.push("/userDashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set user loading
export const setUserLoading = () => {
  return {
    type: SET_USER_LOADING
  };
};
