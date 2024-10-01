import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultProjects } from "../../constants/defaults";

type FormState = {
  projectName: string;
  allProjects: string[];
  email: string;
};

const initialState: FormState = {
  projectName: "",
  allProjects: defaultProjects,
  email: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    addToProjects: (state, action: PayloadAction<string>) => {
      state.allProjects = [action.payload, ...state.allProjects];
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setProjectName, addToProjects, setEmail } = formSlice.actions;

export default formSlice.reducer;
