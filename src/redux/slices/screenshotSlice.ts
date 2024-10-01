import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScreenshotObject = {
  imageUrl: string;
  timeStamp: string;
};

type screenshotArray = {
  all: ScreenshotObject[];
};

const initialState: screenshotArray = {
  all: [],
};

const screenshotSlice = createSlice({
  name: "All Screenshots",
  initialState,
  reducers: {
    addScreenshot: (state, action: PayloadAction<ScreenshotObject>) => {
      if (action.payload) state.all = [action.payload, ...state.all];
    },
    deleteAllScreenshots: (state) => {
      state.all = [];
    },
  },
});

export default screenshotSlice.reducer;
export const { addScreenshot, deleteAllScreenshots } = screenshotSlice.actions;
