import { configureStore } from "@reduxjs/toolkit";
import streamReducer from "./slices/streamSlice";
import formReducer from "./slices/formSlice";
import invitedUserReducer from "./slices/invitedSlice";
import timerReducer from "./slices/timerSlice";
import screenshotReducer from "./slices/screenshotSlice";

const store = configureStore({
  reducer: {
    stream: streamReducer,
    form: formReducer,
    invited: invitedUserReducer,
    timer: timerReducer,
    screenshots: screenshotReducer,
  },
});

export default store;
