import { GET_ENTRIES, ENTRY_LOADING } from "../actions/types";

const initialState = {
  entries: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ENTRY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
