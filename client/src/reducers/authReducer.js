import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  GET_ALL_USERS,
  SET_USER_LOADING,
  SET_USER_BLOCKLIST,
  CLEAR_USER_DATA
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  userList: null,
  userLoading: false,
  userBlocklist: null
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
    case SET_USER_BLOCKLIST:
      return {
        ...state,
        userBlocklist: action.payload
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        isAuthenticated: false,
        userList: null,
        userBlocklist: null,
        user: {}
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
