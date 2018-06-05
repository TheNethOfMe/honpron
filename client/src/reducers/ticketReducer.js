import {
  TICKETS_LOADING,
  GET_TICKETS,
  GET_ONE_TICKET,
  TICKETS_CLEAR
} from "../actions/types";

const initialState = {
  tickets: null,
  ticketLoading: false,
  singleTicket: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TICKETS_LOADING:
      return {
        ...state,
        ticketLoading: true
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        ticketLoading: false
      };
    case GET_ONE_TICKET:
      return {
        ...state,
        singleTicket: action.payload,
        ticketLoading: false
      };
    case TICKETS_CLEAR:
      return {
        ...state,
        singleTicket: null,
        tickets: null,
        ticketLoading: false
      };
    default:
      return state;
  }
}
