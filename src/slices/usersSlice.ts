import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types";
import { findIndex } from "lodash";

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
    addUsers(state: UsersState, { payload: user }: PayloadAction<User>) {
      state.users.push(user);
    },
    editUser(state: UsersState, { payload: user }: PayloadAction<User>) {
      const userIndex = findIndex(state.users, { id: user.id });
      if (userIndex !== -1) {
        state.users.splice(userIndex, 1, user);
      }
    },
  },
});

export const { setUsers, addUsers, editUser } = users.actions;

export default users.reducer;
