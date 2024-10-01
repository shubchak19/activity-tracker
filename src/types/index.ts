import store from "../redux/store";

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export type User = {
  email: string;
  projectAssigned: string;
};
