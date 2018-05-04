import { GET_SERIES } from "./types";

const initialState = {
  series = null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SERIES:
    return {
      ...state,
      series: action.payload
    }
    default:
      return state;
  }
}