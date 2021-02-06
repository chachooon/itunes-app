import { all, fork } from "redux-saga/effects";
import { albumSaga } from "./albums";

export const rootSaga = function* root(): Generator {
  yield all([fork(albumSaga)]);
};
