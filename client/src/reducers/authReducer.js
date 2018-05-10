import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  GET_ALL_USERS,
  SET_USER_LOADING
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  userList: null,
  userLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_ALL_USERS:
      return {
        ...state,
        userList: action.payload,
        userLoading: false
      };
    case SET_USER_LOADING:
      return {
        ...state,
        userLoading: true
      };
    default:
      return state;
  }
}
