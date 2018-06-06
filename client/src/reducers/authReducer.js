import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  GET_ALL_USERS,
  SET_USER_LOADING,
  CLEAR_USER_DATA,
  GET_BLOCK_LIST
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  userList: null,
  userLoading: false,
  blockList: null
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
    case GET_BLOCK_LIST:
      return {
        ...state,
        blockList: action.payload,
        userLoading: false
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        isAuthenticated: false,
        userList: null,
        user: {},
        blockList: null
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
