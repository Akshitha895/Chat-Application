import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import usersSaga from "./chatApp/saga";
import { reducer as userReducer } from "./chatApp/slice";

export const rootReducer = combineReducers({
  users: userReducer,
});

export function* rootSaga() {
  yield all([fork(usersSaga)]);
}
