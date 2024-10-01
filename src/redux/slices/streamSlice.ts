import { createSlice } from "@reduxjs/toolkit";

type ActiveType = {
  isActive: boolean;
};

const initialState: ActiveType = {
  isActive: false,
};

const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    streamIsActive: (state) => {
      state.isActive = true;
    },
    streamHasEnded: (state) => {
      state.isActive = false;
    },
  },
});

export default streamSlice.reducer;
export const { streamIsActive, streamHasEnded } = streamSlice.actions;
