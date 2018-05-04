import { GET_SERIES, SERIES_LOADING } from "../actions/types";

const initialState = {
  series: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SERIES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SERIES:
      return {
        ...state,
        series: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
