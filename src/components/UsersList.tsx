import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { User } from "types";

interface UsersListProps {
  users: User[];
  onEdit: (id: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Users list">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        {users.length ? (
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <Fab size="small" onClick={() => onEdit(user.id)}>
                    <EditIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <caption>No data</caption>
        )}
      </Table>
    </TableContainer>
  );
};

export default UsersList;
