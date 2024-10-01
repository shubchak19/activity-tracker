import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { defaultInvitedUsers } from "../../constants/defaults";

type UserArray = {
  users: User[];
  newUserAdded: boolean;
};

const initialState: UserArray = {
  users: defaultInvitedUsers,
  newUserAdded: false,
};

const invitedSlice = createSlice({
  name: "Invited user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      if (action.payload) {
        state.users = [action.payload, ...state.users];
        state.newUserAdded = true;
      }
    },
    resetAddedStatus: (state) => {
      state.newUserAdded = false;
    },
  },
});

export default invitedSlice.reducer;
export const { addUser, resetAddedStatus } = invitedSlice.actions;
