import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import seriesReducer from "./seriesReducer";
import entryReducer from "./entryReducer";
import msgReducer from "./msgReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  series: seriesReducer,
  entry: entryReducer,
  messages: msgReducer
});
