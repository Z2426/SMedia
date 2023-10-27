import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import themeSilce from "./theme";
import postSlice from "./postSlice";

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSilce,
  posts: postSlice,
});

export { rootReducer };
