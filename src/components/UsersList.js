import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const UsersList = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Users list">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        {users.length ? (
          <TableBody>
            {users.map(({ firstName, lastName, email }, index) => (
              <TableRow key={index}>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>{email}</TableCell>
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
