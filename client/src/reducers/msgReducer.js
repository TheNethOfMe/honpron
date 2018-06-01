import {
  MSG_LOADING,
  GET_MESSAGES,
  GET_ONE_MSG,
  MESSAGE_CLEAR
} from "../actions/types";

const initialState = {
  messages: null,
  msgLoading: false,
  singleMsg: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MSG_LOADING:
      return {
        ...state,
        msgLoading: true
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        msgLoading: false
      };
    case GET_ONE_MSG:
      return {
        ...state,
        singleMsg: action.payload,
        msgLoading: false
      };
    case MESSAGE_CLEAR:
      return {
        ...state,
        messages: null,
        msgLoading: false,
        singleMsg: null
      };
    default:
      return state;
  }
}
