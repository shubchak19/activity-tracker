import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRunning: false,
  seconds: 0,
};

const timerSlice = createSlice({
  name: "Timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.seconds = 0;
    },
    toggleTimer: (state) => {
      state.isRunning = !state.isRunning;
    },
    tick: (state) => {
      state.seconds += 1;
    },
  },
});

export default timerSlice.reducer;
export const { startTimer, pauseTimer, resetTimer, toggleTimer, tick } =
  timerSlice.actions;
