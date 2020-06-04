import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state: UsersState, { payload: users }: PayloadAction<User[]>) {
      state.users = users;
    },
  },
});

export const { setUsers } = users.actions;

export default users.reducer;
