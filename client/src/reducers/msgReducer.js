import { MSG_LOADING, GET_MESSAGES } from "../actions/types";

const initialState = {
  messages: null,
  msgLoading: false
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
    default:
      return state;
  }
}
