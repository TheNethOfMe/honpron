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

// get user's comments
export const getUserComments = () => dispatch => {
  dispatch(setComLoading());
  axios
    .get("/api/comment/user")
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

// delete a comment
export const deleteComment = commentId => dispatch => {
  axios.delete(`/api/comment/${commentId}`).then(res => {
    window.location.reload();
  });
};

// approve a comment
export const approveComment = commentId => dispatch => {
  axios.post(`/api/comment/approve/${commentId}`).then(res => {
    window.location.reload();
  });
};

// when a user deletes their account, this will change the names on their comments to "Deleted User"
export const changeDeletedUserComments = () => dispatch => {
  axios
    .post("/api/comment/userDelete")
    .then(res => console.log("Resume Firing"));
};

export const setComLoading = () => {
  return {
    type: COM_LOADING
  };
};
