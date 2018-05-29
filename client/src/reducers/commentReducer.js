import { GET_COMMENTS, COM_LOADING } from "../actions/types";

const initialState = {
  comments: null,
  comLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        comLoading: false
      };
    case COM_LOADING:
      return {
        ...state,
        comLoading: true
      };
    default:
      return state;
  }
}
