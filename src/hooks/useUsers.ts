import { RootState } from "app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, editUser } from "slices/usersSlice";
import { User } from "../types";

const useEvents = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

  return {
    users,
    actions: {
      addUser: (user: User) => dispatch(addUsers(user)),
      editUser: (user: User) => dispatch(editUser(user)),
    },
  };
};

export default useEvents;
