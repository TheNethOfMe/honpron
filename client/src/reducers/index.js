import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import seriesReducer from "./seriesReducer";
import entryReducer from "./entryReducer";
import msgReducer from "./msgReducer";
import commentReducer from "./commentReducer";
import ticketReducer from "./ticketReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  series: seriesReducer,
  entry: entryReducer,
  messages: msgReducer,
  comments: commentReducer,
  tickets: ticketReducer
});
