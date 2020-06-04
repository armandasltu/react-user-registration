import { RootState } from "app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "slices/usersSlice";
import { User } from "../types";

const useEvents = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

  return {
    users,
    actions: {
      setUsers: (users: User[]) => dispatch(setUsers(users)),
    },
  };
};

export default useEvents;
