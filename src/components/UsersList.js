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
import PropTypes from "prop-types";

const UsersList = ({ users, onEdit }) => {
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
                  <Fab size="small" onClick={() => onEdit(index)}>
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

UsersList.defaultProps = {
  users: [],
};

UsersList.propTypes = {
  users: PropTypes.array,
};

export default UsersList;
