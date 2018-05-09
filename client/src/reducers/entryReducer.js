import {
  GET_ENTRIES,
  ENTRY_LOADING,
  GET_ONE_ENTRY,
  CLEAR_ENTRY
} from "../actions/types";

const initialState = {
  entries: null,
  entryLoading: false,
  singleEntry: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ENTRY_LOADING:
      return {
        ...state,
        entryLoading: true
      };
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        entryLoading: false
      };
    case GET_ONE_ENTRY:
      return {
        ...state,
        singleEntry: action.payload,
        entryLoading: false
      };
    case CLEAR_ENTRY:
      return {
        ...state,
        singleEntry: null
      };
    default:
      return state;
  }
}
