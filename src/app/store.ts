import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

import { setUsers } from "slices/usersSlice";
import { usersList } from "mocks/users";

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(setUsers(usersList));

export default store;
