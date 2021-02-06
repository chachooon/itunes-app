import { combineReducers } from "@reduxjs/toolkit";
import { albums } from "./albums";

const rootReducer = combineReducers({
  albums: albums.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
